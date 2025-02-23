import React, { useState, useMemo } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

// Added course catalog data
const COURSE_CATALOG = [
  { id: "CS201", name: "Data Structures", credits: 3, color: "#e2f0cb" },
  {
    id: "CS101",
    name: "Intro to Programming (Python)",
    credits: 3,
    color: "#a5d8ff",
  },
  { id: "CS205", name: "Computer Architecture", credits: 3, color: "#d1c4e9" },
  { id: "CS305", name: "Operating Systems", credits: 3, color: "#f48fb1" },
  { id: "CS310", name: "Algorithms", credits: 3, color: "#ffccbc" },
  { id: "CS315", name: "Database Systems", credits: 3, color: "#b2dfdb" },
  { id: "CS320", name: "Software Engineering", credits: 3, color: "#f8bbd0" },
  { id: "CS330", name: "Computer Networks", credits: 3, color: "#c5cae9" },
  {
    id: "CS340",
    name: "Artificial Intelligence",
    credits: 3,
    color: "#b2ebf2",
  },
  { id: "CS350", name: "Computer Graphics", credits: 3, color: "#dcedc8" },
];

const RegistrationSystem = () => {
  const [tab, setTab] = useState("compactness");
  const [scheduleCompactness, setScheduleCompactness] = useState(50);
  const [noEveningClasses, setNoEveningClasses] = useState(false);
  const [excludedDays, setExcludedDays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([
    { id: "CS201", name: "Data Structures", credits: 3, color: "#e2f0cb" },
    { id: "MATH301", name: "Linear Algebra", credits: 3, color: "#ffd3b6" },
    { id: "PHY101", name: "Physics I", credits: 4, color: "#ffaaa5" },
  ]);

  const handleExcludedDayChange = (day) => {
    if (excludedDays.includes(day)) {
      setExcludedDays(excludedDays.filter((d) => d !== day));
    } else {
      setExcludedDays([...excludedDays, day]);
    }
  };

  const handleAddCourse = (course) => {
    if (!selectedCourses.find((c) => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course.id !== courseId)
    );
  };

  const filteredCourses = COURSE_CATALOG.filter(
    (course) =>
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const studentInfo = {
    name: "Jane Smith",
    id: "12345",
    major: "Computer Science",
    credits: 16,
    gpa: 3.8,
    minor: "N/A",
    gradeLevel: "Freshman",
    totalCredits: 27,
    collegeSchool: "John Doe College of Computing",
  };

  const generateSchedule = useMemo(() => {
    let courses = [];
    let days = [...DAYS].filter((day) => !excludedDays.includes(day));

    if (days.length === 0) return [];

    if (scheduleCompactness < 50) {
      days = days.filter((day) =>
        ["Monday", "Wednesday", "Friday"].includes(day)
      );
    } else if (scheduleCompactness > 75) {
      days = days.filter((day) => ["Tuesday", "Thursday"].includes(day));
    }

    if (days.length === 0) return [];

    courses = selectedCourses.map((course, index) => {
      const day = days[index % days.length];
      const startTime = noEveningClasses
        ? `${8 + (index % 6)}:00`
        : `${8 + (index % 9)}:00`;

      return {
        ...course,
        day,
        startTime,
        duration: 2,
      };
    });

    return courses;
  }, [scheduleCompactness, noEveningClasses, excludedDays, selectedCourses]);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-gray-600 p-4 flex items-center justify-between w-full">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/New_Jersey_IT_logo.svg/1200px-New_Jersey_IT_logo.svg.png"
          alt="College Logo"
          className="w-[120px] h-[auto] mr-4"
        />
        <ul className="flex space-x-6 text-white font-semibold">
          <li className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
            Home
          </li>
          <li className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
            Courses
          </li>
          <li className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
            Registration
          </li>
          <li className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
            Academic Records
          </li>
          <li className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
            Financials
          </li>
          <li className="hover:bg-gray-700 px-4 py-2 rounded cursor-pointer">
            Support and Resources
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Student Dashboard */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Student Dashboard</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p>
                <strong>Name:</strong> {studentInfo.name}
              </p>
              <p>
                <strong>ID:</strong> {studentInfo.id}
              </p>
              <p>
                <strong>Major:</strong> {studentInfo.major}
              </p>
            </div>
            <div>
              <p>
                <strong>Credits:</strong> {studentInfo.credits}
              </p>
              <p>
                <strong>GPA:</strong> {studentInfo.gpa}
              </p>
              <p>
                <strong>Minor:</strong> {studentInfo.minor}
              </p>
            </div>
            <div>
              <p>
                <strong>Grade level:</strong> {studentInfo.gradeLevel}
              </p>
              <p>
                <strong> Total credits:</strong> {studentInfo.totalCredits}
              </p>
              <p>
                <strong> School:</strong> {studentInfo.collegeSchool}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Preferences */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Schedule Preferences</h2>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("compactness")}
              className={`px-4 py-2 rounded ${
                tab === "compactness" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Compactness
            </button>
            <button
              onClick={() => setTab("timePreferences")}
              className={`px-4 py-2 rounded ${
                tab === "timePreferences"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Time Preferences
            </button>
          </div>

          {tab === "compactness" && (
            <div>
              <label className="block mb-2">Schedule Compactness</label>
              <input
                type="range"
                min="0"
                max="100"
                value={scheduleCompactness}
                onChange={(e) => setScheduleCompactness(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span>More Spread Out</span>
                <span>More Compact</span>
              </div>
            </div>
          )}

          {tab === "timePreferences" && (
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={noEveningClasses}
                  onChange={() => setNoEveningClasses(!noEveningClasses)}
                  className="mr-2"
                />
                No Evening Classes (No classes after 4 PM)
              </label>

              <div className="border-t pt-4">
                <p className="font-medium mb-2">Select days with no classes:</p>
                <div className="grid grid-cols-5 gap-2">
                  {DAYS.map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={excludedDays.includes(day)}
                        onChange={() => handleExcludedDayChange(day)}
                        className="mr-2"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
          <div className="min-w-[800px] grid grid-cols-6 gap-1">
            <div className="font-semibold">Time</div>
            {DAYS.map((day) => (
              <div key={day} className="font-semibold text-center">
                {day}
              </div>
            ))}
            {TIME_SLOTS.map((time) => (
              <React.Fragment key={time}>
                <div className="border-t py-2 text-sm">{time}</div>
                {DAYS.map((day) => (
                  <div
                    key={`${day}-${time}`}
                    className="border-t border-l relative"
                  >
                    {generateSchedule.map((course) =>
                      course.day === day && course.startTime === time ? (
                        <div
                          key={course.id}
                          className="absolute w-full p-1 rounded text-sm"
                          style={{
                            backgroundColor: course.color,
                            height: "80px",
                            zIndex: 10,
                          }}
                        >
                          {course.name} ({course.id})
                        </div>
                      ) : null
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Course Catalog */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Course Catalog</h2>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for CS courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Search Results */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Available Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <div>
                    <span className="font-medium">{course.id}</span> -{" "}
                    {course.name}
                  </div>
                  <button
                    onClick={() => handleAddCourse(course)}
                    disabled={selectedCourses.some((c) => c.id === course.id)}
                    className={`px-3 py-1 rounded ${
                      selectedCourses.some((c) => c.id === course.id)
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Courses */}
          <div>
            <h3 className="font-semibold mb-2">Selected Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <div>
                    <span className="font-medium">{course.id}</span> -{" "}
                    {course.name}
                  </div>
                  <button
                    onClick={() => handleRemoveCourse(course.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSystem;
