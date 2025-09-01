import HeroImage from "/assets/hero-img.png";

const Image = {
  HeroImage,
};

export default Image;

import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/android_studio.png";
import Tools3 from "/assets/tools/kotlin.png";
import Tools4 from "/assets/tools/c++.png";
import Tools5 from "/assets/tools/python.png";
import Tools6 from "/assets/tools/yolo.png";
import Tools7 from "/assets/tools/Raspberry_Pi.png";
import Tools8 from "/assets/tools/reactjs.png";
import Tools9 from "/assets/tools/tailwind.png";
import Tools10 from "/assets/tools/js.png";
import Tools11 from "/assets/tools/nodejs.png";
import Tools12 from "/assets/tools/OpenCV.png";
import Tools13 from "/assets/tools/github.png";
import Tools14 from "/assets/tools/firebase.png";
import Tools15 from "/assets/tools/streamlit.png";
import Tools16 from "/assets/tools/figma.png";
import Tools17 from "/assets/tools/ai.png";
import Tools18 from "/assets/tools/canva.png";

export const listTools = [
  // Code Editor
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "Android Studio",
    ket: "Code Editor",
    dad: "200",
  },
  // Language
  {
    id: 3,
    gambar: Tools3,
    nama: "Kotlin",
    ket: "Language",
    dad: "300",
  },
  {
    id: 4,
    gambar: Tools4,
    nama: "C++",
    ket: "Language",
    dad: "400",
  },
  {
    id: 5,
    gambar: Tools5,
    nama: "Python",
    ket: "Language",
    dad: "500",
  },
  {
    id: 10,
    gambar: Tools10,
    nama: "JavaScript",
    ket: "Language",
    dad: "1000",
  },
  // Framework
  {
    id: 8,
    gambar: Tools8,
    nama: "React JS",
    ket: "Framework",
    dad: "800",
  },
  {
    id: 9,
    gambar: Tools9,
    nama: "Tailwind CSS",
    ket: "Framework",
    dad: "900",
  },
  {
    id: 15,
    gambar: Tools15,
    nama: "Streamlit",
    ket: "Framework",
    dad: "1500",
  },
  // Library
  {
    id: 12,
    gambar: Tools12,
    nama: "OpenCV",
    ket: "Library",
    dad: "1200",
  },
  // Object Detection
  {
    id: 6,
    gambar: Tools6,
    nama: "YOLO",
    ket: "Object Detection",
    dad: "600",
  },
  // Javascript Runtime
  {
    id: 11,
    gambar: Tools11,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "1100",
  },
  // Cloud Service
  {
    id: 14,
    gambar: Tools14,
    nama: "Firebase",
    ket: "Cloud Service",
    dad: "1400",
  },
  // Repository
  {
    id: 13,
    gambar: Tools13,
    nama: "Github",
    ket: "Repository",
    dad: "1300",
  },
  // Design App
  {
    id: 16,
    gambar: Tools16,
    nama: "Figma",
    ket: "Design App",
    dad: "1600",
  },
  {
    id: 17,
    gambar: Tools17,
    nama: "Adobe Illustrator",
    ket: "Design App",
    dad: "1700",
  },
  {
    id: 18,
    gambar: Tools18,
    nama: "Canva",
    ket: "Design App",
    dad: "1800",
  },
  // Single-board Computer
  {
    id: 7,
    gambar: Tools7,
    nama: "Raspberry Pi",
    ket: "Single-board Computer",
    dad: "700",
  },
];

import Proyek1 from "/assets/proyek/proyek1.png";
import Proyek2 from "/assets/proyek/proyek2.png";
import Proyek3 from "/assets/proyek/proyek3.png";
import Proyek4 from "/assets/proyek/proyek4.png";
import Proyek5 from "/assets/proyek/proyek5.png";
import Proyek6 from "/assets/proyek/proyek6.png";
import Proyek7 from "/assets/proyek/proyek7.png";
import Proyek8 from "/assets/proyek/proyek8.png";
import Proyek8_2 from "/assets/proyek/proyek8_2.png";
import Proyek9 from "/assets/proyek/proyek9.png";
import Proyek10 from "/assets/proyek/proyek10.png";
import Proyek11 from "/assets/proyek/proyek11.png";
import Proyek11_2 from "/assets/proyek/proyek11_2.png";
import Proyek12 from "/assets/proyek/proyek12.png";
import Proyek13 from "/assets/proyek/proyek13.png";

export const listProyek = [
  {
    id: 1,
    gambar: Proyek1,
    nama: "Real-time Sharp Object and Physical Violence Detections",
    desk: "Computer Vision System to detect sharp objects and physical violence in real-time.",
    deskripsiDetail: "Real-time testing was conducted directly using the YOLO11 model, both in its Baseline and Tuned versions, on an edge device Raspberry Pi 5 equipped with the Raspberry Pi AI HAT+ module, using video input from CCTV.",
    tools: ["Python", "YOLOv11", "Streamlit", "Raspberry Pi"],
    dad: "200",
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: "Trashify Application",
    desk: "Application embedded with Machine Learning to give information about trash.",
    tools: ["Kotlin", "CSS", "Javascript", "Android Studio"],
    dad: "300",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Story Application",
    desk: "An application where users can view and post stories. Users can also view the locations of those stories in Google Maps.",
    tools: ["Kotlin", "CSS", "Javascript", "Android Studio"],
    dad: "400",
  },
  {
    id: 4,
    gambar: Proyek4,
    nama: "Skin  Cancer Detection Application",
    desk: "An application for detecting skin cancer using image analysis.",
    tools: ["Kotlin", "CSS", "Javascript", "Android Studio"],
    dad: "500",
  },
  {
    id: 5,
    gambar: Proyek5,
    nama: "GitHub User Application",
    desk: "An application to view GitHub user profiles.",
    tools: ["Kotlin", "CSS", "Javascript", "Android Studio"],
    dad: "600",
  },
  {
    id: 6,
    gambar: Proyek6,
    nama: "Basic Kotlin Application",
    desk: "A Kotlin application featuring concepts to display a list of contacts and profiles for each user.",
    tools: ["Kotlin", "CSS", "Javascript", "Android Studio"],
    dad: "700",
  },
  {
    id: 7,
    gambar: Proyek7,
    nama: "Basic Flutter Application",
    desk: "Creating widgets in the UNO Picker application based on Flutter.",
    tools: ["Flutter", "Android Studio"],
    dad: "800",
  },
  {
    id: 8,
    gambar: Proyek8,
    nama: "Smart Lab",
    desk: "This project aims to create a Smart Lab that utilizes IoT devices as its foundation",
    deskripsiDetail: "The Smart Lab project focuses on integrating various IoT devices to create a comprehensive laboratory environment that can monitor and control experiments remotely.",
    tools: ["PZEM-004T", "ESP-01 Relay Module", "RCWL-0516 Movement Detector", "IR Sensor", "Rhasspy", "Arduino IDE"],
    gallery: [Proyek8, Proyek8_2],
    dad: "900",
  },
  {
    id: 9,
    gambar: Proyek9,
    nama: "ITS Smart Gate",
    desk: "Creating an electronic system for opening and closing gates at ITS using student ID card tap",
    deskripsiDetail: "The ITS Smart Gate project involves developing an electronic gate system that utilizes PN532 RFID technology and ESP32 to allow students to access the campus by tapping their student ID cards, enhancing security and convenience.",
    tools: ["ESP32", "PN532 RFID", "Arduino IDE"],
    dad: "1000",
  },
  {
    id: 10,
    gambar: Proyek10,
    nama: "IoT Car Project",
    desk: "Building an IoT car using ESP8266 and L298N Driver.",
    tools: ["ESP8266", "L298N Driver", "Arduino IDE"],
    dad: "1100",
  },
  {
    id: 11,
    gambar: Proyek11,
    nama: "Gemastik - Publink",
    desk: "Optimization of Public Service Applications and Population Mobility Systems through QR Code and NFC Technology in Surabaya City.",
    deskripsiDetail: "The Gemastik - Publink project concept aims to enhance public services and population mobility in Surabaya City by leveraging QR Code and NFC technology for efficient identification and tracking.",
    tools: ["Smart Cities", "Innovation Concept"],
    gallery: [Proyek11, Proyek11_2],
    dad: "1200",
  },
  {
    id: 12,
    gambar: Proyek12,
    nama: "Strato - Smart Farm",
    desk: "This project proposal plans for the development of the Pujonkidul area in Malang Regency.",
    deskripsiDetail: "This project proposal plans for the development of the Pujonkidul area in Malang Regency. It adopts the STRATO technology concept in a smart farming system with vertical aeroponic plantations. By utilizing technologies such as sensors, cameras, LED Lighting, mist makers, and distribution robots, this system can monitor and control plant conditions automatically and in real-time.",
    tools: ["Smart Cities", "Innovation Concept"],
    dad: "1300",
  },
  {
    id: 13,
    gambar: Proyek13,
    nama: "Traffic Counting",
    desk: "Analysis of Car Numbers in the Keputih Area, Surabaya City",
    deskripsiDetail: "With the development of the Sepuluh Nopember Institute of Technology (ITS) and the dynamics of student life in its vicinity, the Keputih area in Surabaya has become a dense center of mobility and transportation. This research aims to provide a comprehensive overview, identify the impacts of student mobility, and formulate effective solutions to improve efficiency and comfort in transportation in the area.",
    tools: ["Smart Cities", "Innovation Concept", "Traffic Counting"],
    dad: "1400",
  }
];

import Certificate1 from "/assets/certificates/certificate1.png";
import Certificate2 from "/assets/certificates/certificate2.png";
import Certificate3 from "/assets/certificates/certificate3.png";
import Certificate4 from "/assets/certificates/certificate4.png";
import Certificate5 from "/assets/certificates/certificate5.png";
import Certificate6 from "/assets/certificates/certificate6.png";
import Certificate7 from "/assets/certificates/certificate7.png";
import Certificate8 from "/assets/certificates/certificate8.png";
import Certificate9 from "/assets/certificates/certificate9.png";
import Certificate10 from "/assets/certificates/certificate10.png";
import Certificate11 from "/assets/certificates/certificate11.png";

export const certificates = [
  {
    id: 1,
    type: "Mobile Development",
    title: "Belajar Fundamental Aplikasi Android",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate1,
  },
  {
    id: 2,
    type: "Mobile Development",
    title: "Belajar Membuat Aplikasi Android untuk Pemula",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate2,
  },
  {
    id: 3,
    type: "Mobile Development",
    title: "Memulai Pemrograman dengan Kotlin",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate3,
  },
  {
    id: 4,
    type: "Mobile Development",
    title: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate4,
  },
  {
    id: 5,
    type: "Mobile Development",
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate5,
  },
  {
    id: 6,
    type: "Mobile Development",
    title: "Programming Logic 101",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate6,
  },
  {
    id: 7,
    type: "Mobile Development",
    title: "Belajar dasar Git dengan GitHub",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate7,
  },
  {
    id: 8,
    type: "Mobile Development",
    title: "Belajar Pengembangan Aplikasi Android Intermediate",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate8,
  },
  {
    id: 9,
    type: "Mobile Development",
    title: "Belajar Dasar AI",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate9,
  },
      {
    id: 10,
    type: "Mobile Development",
    title: "Belajar Penerapan Machine Learning untuk Android",
    issuer: "Dicoding",
    date: "2024",
    gambar: Certificate10,
  },
      {
    id: 11,
    type: "Smart City",
    title: "Smart Cities - Management of Smart Urban Infrastructure",
    issuer: "EPFL",
    date: "2024",
    gambar: Certificate11,
  },
];
