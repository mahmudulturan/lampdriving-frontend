import InstructorInfo from "./InstructorInfo";
import OtherInstructors from "./OtherInstructors";
import Reviews from "./Reviews";
import Sidebar from "./Sidebar";

export default function InstructorProfile() {
  return (
    <div className="bg-gray-50">
      <main className="wrapper py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            <InstructorInfo />
            <Reviews />
            <div className="hidden md:block">
              <OtherInstructors />
            </div>
          </div>
          {/* Sidebar */}
          <div>
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
