import Proyek1 from '/assets/proyek/proyek1.png';
import Proyek2 from '/assets/proyek/proyek2.png';
import Proyek3 from '/assets/proyek/proyek3.png';
import Proyek4 from '/assets/proyek/proyek4.png';
import Proyek5 from '/assets/proyek/proyek5.png';
import Proyek6 from '/assets/proyek/proyek6.png';
import Proyek7 from '/assets/proyek/proyek7.png';
import Proyek8 from '/assets/proyek/proyek8.png';
import Proyek8_2 from '/assets/proyek/proyek8_2.png';
import Proyek9 from '/assets/proyek/proyek9.png';
import Proyek10 from '/assets/proyek/proyek10.png';
import Proyek11 from '/assets/proyek/proyek11.png';
import Proyek11_2 from '/assets/proyek/proyek11_2.png';
import Proyek12 from '/assets/proyek/proyek12.png';
import Proyek13 from '/assets/proyek/proyek13.png';

export const listProyek = [
  {
    id: 1,
    gambar: Proyek1,
    nama: 'Real-time Sharp Object and Physical Violence Detections',
    desk: 'Computer Vision System to detect sharp objects and physical violence in real-time.',
    deskripsiDetail:
      'Real-time testing was conducted directly using the YOLO11 model, both in its Baseline and Tuned versions, on an edge device Raspberry Pi 5 equipped with the Raspberry Pi AI HAT+ module, using video input from CCTV.',
    tools: ['Python', 'YOLOv11', 'Streamlit', 'Raspberry Pi'],
    domain: 'Computer Vision',
    dad: '200',
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: 'Trashify Application',
    desk: 'Application embedded with Machine Learning to give information about trash.',
    tools: ['Kotlin', 'CSS', 'Javascript', 'Android Studio'],
    domain: 'Mobile Development',
    dad: '300',
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: 'Story Application',
    desk: 'An application where users can view and post stories. Users can also view the locations of those stories in Google Maps.',
    tools: ['Kotlin', 'CSS', 'Javascript', 'Android Studio'],
    domain: 'Mobile Development',
    dad: '400',
  },
  {
    id: 4,
    gambar: Proyek4,
    nama: 'Skin Cancer Detection Application',
    desk: 'An application for detecting skin cancer using image analysis.',
    tools: ['Kotlin', 'CSS', 'Javascript', 'Android Studio'],
    domain: 'Mobile Development',
    dad: '500',
  },
  {
    id: 5,
    gambar: Proyek5,
    nama: 'GitHub User Application',
    desk: 'An application to view GitHub user profiles.',
    tools: ['Kotlin', 'CSS', 'Javascript', 'Android Studio'],
    domain: 'Mobile Development',
    dad: '600',
  },
  {
    id: 6,
    gambar: Proyek6,
    nama: 'Basic Kotlin Application',
    desk: 'A Kotlin application featuring concepts to display a list of contacts and profiles for each user.',
    tools: ['Kotlin', 'CSS', 'Javascript', 'Android Studio'],
    domain: 'Mobile Development',
    dad: '700',
  },
  {
    id: 7,
    gambar: Proyek7,
    nama: 'Basic Flutter Application',
    desk: 'Creating widgets in the UNO Picker application based on Flutter.',
    tools: ['Flutter', 'Android Studio'],
    domain: 'Mobile Development',
    dad: '800',
  },
  {
    id: 8,
    gambar: Proyek8,
    nama: 'Smart Lab',
    desk: 'This project aims to create a Smart Lab that utilizes IoT devices as its foundation.',
    deskripsiDetail:
      'The Smart Lab project focuses on integrating various IoT devices to create a comprehensive laboratory environment that can monitor and control experiments remotely.',
    tools: ['PZEM-004T', 'ESP-01 Relay Module', 'RCWL-0516 Motion Sensor', 'IR Sensor', 'Rhasspy', 'Arduino IDE'],
    gallery: [Proyek8, Proyek8_2],
    domain: 'IoT',
    dad: '900',
  },
  {
    id: 9,
    gambar: Proyek9,
    nama: 'ITS Smart Gate',
    desk: 'Creating an electronic system for opening and closing gates at ITS using student ID card tap.',
    deskripsiDetail:
      'The ITS Smart Gate project involves developing an electronic gate system that utilizes PN532 RFID technology and ESP32 to allow students to access the campus by tapping their student ID cards, enhancing security and convenience.',
    tools: ['ESP32', 'PN532 RFID', 'Arduino IDE'],
    domain: 'IoT',
    dad: '1000',
  },
  {
    id: 10,
    gambar: Proyek10,
    nama: 'IoT Car Project',
    desk: 'Building an IoT car using ESP8266 and L298N Driver.',
    tools: ['ESP8266', 'L298N Driver', 'Arduino IDE'],
    domain: 'IoT',
    dad: '1100',
  },
  {
    id: 11,
    gambar: Proyek11,
    nama: 'Gemastik - Publink',
    desk: 'Optimization of Public Service Applications and Population Mobility Systems through QR Code and NFC Technology in Surabaya City.',
    deskripsiDetail:
      'The Gemastik - Publink project concept aims to enhance public services and population mobility in Surabaya City by leveraging QR Code and NFC technology for efficient identification and tracking.',
    tools: ['Smart Cities', 'QR Code', 'NFC'],
    gallery: [Proyek11, Proyek11_2],
    domain: 'Smart City',
    dad: '1200',
  },
  {
    id: 12,
    gambar: Proyek12,
    nama: 'Strato - Smart Farm',
    desk: 'This project proposal plans for the development of the Pujonkidul area in Malang Regency.',
    deskripsiDetail:
      'This project proposal plans for the development of the Pujonkidul area in Malang Regency. It adopts the STRATO technology concept in a smart farming system with vertical aeroponic plantations. By utilizing technologies such as sensors, cameras, LED Lighting, mist makers, and distribution robots, this system can monitor and control plant conditions automatically and in real-time.',
    tools: ['Smart Cities', 'Aeroponics', 'Sensors'],
    domain: 'Smart City',
    dad: '1300',
  },
  {
    id: 13,
    gambar: Proyek13,
    nama: 'Traffic Counting',
    desk: 'Analysis of Car Numbers in the Keputih Area, Surabaya City.',
    deskripsiDetail:
      'With the development of the Sepuluh Nopember Institute of Technology (ITS) and the dynamics of student life in its vicinity, the Keputih area in Surabaya has become a dense center of mobility and transportation. This research aims to provide a comprehensive overview, identify the impacts of student mobility, and formulate effective solutions to improve efficiency and comfort in transportation in the area.',
    tools: ['Smart Cities', 'Traffic Counting', 'Data Analysis'],
    domain: 'Smart City',
    dad: '1400',
  },
];

export const getProjectById = (id) => listProyek.find((project) => project.id === Number(id));
