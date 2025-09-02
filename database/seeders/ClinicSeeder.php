<?php

namespace Database\Seeders;

use App\Models\ClinicGallery;
use App\Models\ClinicService;
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ClinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin Klinik',
            'email' => 'admin@clinic.com',
            'phone' => '+62812345678901',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);

        // Create sample doctors
        $doctors = [
            [
                'name' => 'Dr. Sarah Wijaya, drg.',
                'email' => 'sarah@clinic.com',
                'phone' => '+62812345678902',
                'specialization' => 'General Dentist',
                'bio' => 'Dr. Sarah memiliki pengalaman 10+ tahun dalam perawatan gigi umum dengan fokus pada pencegahan dan perawatan konservatif.',
                'is_active' => true,
            ],
            [
                'name' => 'Dr. Ahmad Firdaus, drg., Sp.Ort',
                'email' => 'ahmad@clinic.com', 
                'phone' => '+62812345678903',
                'specialization' => 'Orthodontist',
                'bio' => 'Spesialis orthodonti dengan keahlian dalam perawatan kawat gigi dan koreksi susunan gigi untuk semua usia.',
                'is_active' => true,
            ],
            [
                'name' => 'Dr. Maya Putri, drg., Sp.KGA',
                'email' => 'maya@clinic.com',
                'phone' => '+62812345678904', 
                'specialization' => 'Pediatric Dentist',
                'bio' => 'Dokter gigi anak yang berpengalaman dalam menangani perawatan gigi khusus untuk bayi, anak-anak, dan remaja.',
                'is_active' => true,
            ],
        ];

        foreach ($doctors as $doctorData) {
            $doctor = Doctor::create($doctorData);

            // Create user account for doctor
            User::create([
                'name' => $doctorData['name'],
                'email' => $doctorData['email'],
                'phone' => $doctorData['phone'],
                'role' => 'doctor',
                'password' => Hash::make('password'),
                'is_active' => true,
            ]);

            // Create weekly schedule for doctor (Monday to Friday)
            for ($day = 1; $day <= 5; $day++) {
                DoctorSchedule::create([
                    'doctor_id' => $doctor->id,
                    'day_of_week' => $day,
                    'start_time' => '09:00:00',
                    'end_time' => '17:00:00',
                    'slot_duration' => 30,
                    'is_active' => true,
                ]);
            }
        }

        // Create sample services
        $services = [
            [
                'name' => 'Pemeriksaan Rutin',
                'description' => 'Pemeriksaan kesehatan gigi dan mulut secara menyeluruh termasuk konsultasi dan diagnosa.',
                'price' => 150000,
                'sort_order' => 1,
            ],
            [
                'name' => 'Scaling & Polishing',
                'description' => 'Pembersihan karang gigi profesional dan pemolesan untuk kesehatan gigi optimal.',
                'price' => 300000,
                'sort_order' => 2,
            ],
            [
                'name' => 'Penambalan Gigi',
                'description' => 'Perawatan karies dan penambalan gigi dengan bahan berkualitas tinggi.',
                'price' => 250000,
                'sort_order' => 3,
            ],
            [
                'name' => 'Perawatan Saluran Akar',
                'description' => 'Perawatan endodontik untuk menyelamatkan gigi yang terinfeksi atau rusak parah.',
                'price' => 800000,
                'sort_order' => 4,
            ],
            [
                'name' => 'Pemasangan Kawat Gigi',
                'description' => 'Perawatan ortodontik untuk merapikan susunan dan bentuk gigi.',
                'price' => 5000000,
                'sort_order' => 5,
            ],
            [
                'name' => 'Cabut Gigi',
                'description' => 'Pencabutan gigi yang aman dan nyaman dengan teknik modern.',
                'price' => 200000,
                'sort_order' => 6,
            ],
        ];

        foreach ($services as $service) {
            ClinicService::create(array_merge($service, ['is_active' => true]));
        }

        // Create sample gallery items
        $galleryItems = [
            [
                'title' => 'Ruang Tunggu yang Nyaman',
                'description' => 'Area tunggu yang bersih dan nyaman untuk pasien',
                'image_path' => '/images/gallery/waiting-room.jpg',
                'sort_order' => 1,
            ],
            [
                'title' => 'Ruang Perawatan Modern',
                'description' => 'Fasilitas perawatan dengan peralatan terkini',
                'image_path' => '/images/gallery/treatment-room.jpg',
                'sort_order' => 2,
            ],
            [
                'title' => 'Area Resepsionis',
                'description' => 'Pelayanan pendaftaran yang ramah dan profesional',
                'image_path' => '/images/gallery/reception.jpg',
                'sort_order' => 3,
            ],
            [
                'title' => 'Peralatan Sterilisasi',
                'description' => 'Sistem sterilisasi canggih untuk keamanan pasien',
                'image_path' => '/images/gallery/sterilization.jpg',
                'sort_order' => 4,
            ],
        ];

        foreach ($galleryItems as $item) {
            ClinicGallery::create(array_merge($item, ['is_active' => true]));
        }

        // Create sample patient
        User::create([
            'name' => 'Pasien Demo',
            'email' => 'patient@clinic.com',
            'phone' => '+62812345678905',
            'role' => 'patient',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);
    }
}