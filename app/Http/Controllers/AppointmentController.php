<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAppointmentRequest;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    /**
     * Display a listing of appointments for the authenticated user.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isPatient()) {
            $appointments = Appointment::with(['doctor'])
                ->where('user_id', $user->id)
                ->orderBy('appointment_date', 'desc')
                ->paginate(10);
        } elseif ($user->isDoctor()) {
            // Find the doctor record for this user
            $doctor = Doctor::where('email', $user->email)->first();
            if ($doctor) {
                $appointments = Appointment::with(['user'])
                    ->where('doctor_id', $doctor->id)
                    ->orderBy('appointment_date', 'desc')
                    ->paginate(10);
            } else {
                $appointments = collect();
            }
        } else {
            // Admin sees all appointments
            $appointments = Appointment::with(['user', 'doctor'])
                ->orderBy('appointment_date', 'desc')
                ->paginate(10);
        }

        return Inertia::render('appointments/index', [
            'appointments' => $appointments
        ]);
    }

    /**
     * Show the form for creating a new appointment.
     */
    public function create()
    {
        $doctors = Doctor::active()->get();
        
        return Inertia::render('appointments/create', [
            'doctors' => $doctors
        ]);
    }

    /**
     * Store a newly created appointment.
     */
    public function store(StoreAppointmentRequest $request)
    {
        $appointment = Appointment::create(array_merge(
            $request->validated(),
            ['user_id' => $request->user()->id]
        ));

        return redirect()->route('appointments.show', $appointment)
            ->with('success', 'Appointment booked successfully! You will receive a confirmation via email and WhatsApp.');
    }

    /**
     * Display the specified appointment.
     */
    public function show(Appointment $appointment)
    {
        $appointment->load(['user', 'doctor']);
        
        // Check authorization
        $user = auth()->user();
        if ($user->isPatient() && $appointment->user_id !== $user->id) {
            abort(403);
        }
        
        if ($user->isDoctor()) {
            $doctor = Doctor::where('email', $user->email)->first();
            if (!$doctor || $appointment->doctor_id !== $doctor->id) {
                abort(403);
            }
        }

        return Inertia::render('appointments/show', [
            'appointment' => $appointment
        ]);
    }

    /**
     * Show the form for editing the appointment.
     */
    public function edit(Appointment $appointment)
    {
        // Only admins and patients (for their own appointments) can edit
        $user = auth()->user();
        if ($user->isPatient() && $appointment->user_id !== $user->id) {
            abort(403);
        }
        
        if ($user->isDoctor()) {
            abort(403); // Doctors cannot edit appointments, only update status
        }

        $doctors = Doctor::active()->get();
        $appointment->load(['doctor']);

        return Inertia::render('appointments/edit', [
            'appointment' => $appointment,
            'doctors' => $doctors
        ]);
    }

    /**
     * Update the specified appointment.
     */
    public function update(StoreAppointmentRequest $request, Appointment $appointment)
    {
        // Authorization check
        $user = $request->user();
        if ($user->isPatient() && $appointment->user_id !== $user->id) {
            abort(403);
        }
        
        if ($user->isDoctor()) {
            abort(403);
        }

        $appointment->update($request->validated());

        return redirect()->route('appointments.show', $appointment)
            ->with('success', 'Appointment updated successfully.');
    }

    /**
     * Remove the specified appointment.
     */
    public function destroy(Appointment $appointment)
    {
        // Authorization check
        $user = auth()->user();
        if ($user->isPatient() && $appointment->user_id !== $user->id) {
            abort(403);
        }
        
        if ($user->isDoctor()) {
            abort(403);
        }

        $appointment->delete();

        return redirect()->route('appointments.index')
            ->with('success', 'Appointment cancelled successfully.');
    }


}