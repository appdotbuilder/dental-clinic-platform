<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\DoctorSchedule;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display available time slots for appointments.
     */
    public function index(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date|after_or_equal:today',
        ]);

        $doctorId = $request->doctor_id;
        $date = $request->date;
        $dayOfWeek = date('N', strtotime($date)); // 1 = Monday, 7 = Sunday

        // Get doctor's schedule for this day
        $schedule = DoctorSchedule::where('doctor_id', $doctorId)
            ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true)
            ->first();

        if (!$schedule) {
            return response()->json(['slots' => []]);
        }

        // Generate time slots
        $slots = [];
        $startTime = strtotime($schedule->start_time);
        $endTime = strtotime($schedule->end_time);
        $slotDuration = $schedule->slot_duration * 60; // Convert to seconds

        while ($startTime < $endTime) {
            $timeSlot = date('H:i:s', $startTime);
            $slots[] = $timeSlot;
            $startTime += $slotDuration;
        }

        // Remove already booked slots
        $bookedSlots = Appointment::where('doctor_id', $doctorId)
            ->whereDate('appointment_date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->pluck('start_time')
            ->toArray();

        $availableSlots = array_diff($slots, $bookedSlots);

        return response()->json(['slots' => array_values($availableSlots)]);
    }
}