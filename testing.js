const students = [
    {
        id: 1,
        name: "Alex",
        interests: ["programming", "math"],
        gpa: 3.8,
        preferredLocation: "New York",
    },
    {
        id: 2,
        name: "Sarah",
        interests: ["biology", "chemistry"],
        gpa: 3.9,
        preferredLocation: "California",
    },
    {
        id: 3,
        name: "John",
        interests: ["computer science", "mathematics"],
        gpa: 3.7,
        preferredLocation: "New York",
    },
];

const universities = [
    {
        id: 101,
        name: "Tech University",
        courses: ["computer Science", "mathematics"],
        location: "New York",
        minGPA: 3.5,
    },
    {
        id: 102,
        name: "Science Academy",
        courses: ["biology", "chemistry"],
        location: "California",
        minGPA: 3.6,
    },
];

const newstudent = [];
students.forEach((student) =>
    universities.forEach((univ) => {
        const matched = student.interests.filter((interest) =>
            univ.courses.includes(interest)
        );
        newstudent.push({
            name: student.name,
            univercity: univ.name,
            match: matched.length,
        });
    })
);
console.log(newstudent.sort((a, b) => b.match - a.match));
