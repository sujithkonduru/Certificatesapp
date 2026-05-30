export function TopCourses({ courses }) {
  const maxCount = Math.max(...courses.map(c => c.count))
  
  return (
    <div className="card">
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 12 }}>Top Courses</div>
      {courses.map((course, index) => (
        <div key={course.name} style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
            <span style={{ color: "#374151", fontWeight: index === 0 ? 600 : 400 }}>{course.name}</span>
            <span style={{ fontWeight: 600 }}>{course.count}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(course.count / maxCount) * 100}%`, background: index === 0 ? "#2563eb" : "#93c5fd" }} />
          </div>
        </div>
      ))}
    </div>
  )
}