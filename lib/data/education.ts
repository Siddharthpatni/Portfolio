export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export const educations: Education[] = [
  {
    degree: "M.Sc. Digital Technologies",
    institution: "Ostfalia University of Applied Sciences & TU Clausthal (Germany)",
    period: "Mar 2025 - Present",
    details: [
      "Specialization in Autonomous AI Agents, Robotics, and Deep Learning.",
      "Core Coursework: Artificial Intelligence, Computer Vision, Real-Time Operating Systems, Embedded IoT.",
      "Completed CORE Research internship at Ciconia Systems GmbH building procurement document harvesting agents.",
      "Developed multi-robot grocery assistant using Pepper & Temi platforms as part of advanced lab coursework.",
      "Focus: Distributed Systems, MLOps Pipelines, and Autonomous Agentic Implementations."
    ]
  },
  {
    degree: "B.Tech. Computer Engineering",
    institution: "Charotar University of Science and Technology (CHARUSAT) (India)",
    period: "Jul 2021 - May 2024",
    details: [
      "CGPA: 7.6 / 10",
      "Focused on Core Computer Science principles, algorithms, full-stack dev, and neural networks.",
      "Developed retail assistants and IoT sensor integration models."
    ]
  },
  {
    degree: "Diploma in Computer Engineering",
    institution: "Gujarat Technological University (GTU) (India)",
    period: "Jun 2018 - Jun 2021",
    details: [
      "CGPA: 8.92 / 10 (High Distinction)",
      "Foundation in Object-Oriented Programming, Database Systems, Operating Systems, and Scripting."
    ]
  }
];

