import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { initSmoothScroll } from '@/shared/utils/smoothScroll';
import { EventDetailsHero } from '@/features/events/components/EventDetailsHero';
import { EventDetailsSidebar } from '@/features/events/components/EventDetailsSidebar';
import { EventDetailsContent } from '@/features/events/components/EventDetailsContent';
import { useEvent } from '@/shared/queries/events';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Helper function to format time
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Initialize smooth scroll
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return cleanup;
  }, []);

  // Mock data for testing UI
  const MOCK_EVENT = {
    id: '1',
    title: 'Advanced Robotics Workshop: Building Autonomous Systems',
    description:
      'Join us for an immersive 2-day workshop on ROS2 and sensor integration. Master the skills to build the robots of tomorrow.',
    location: 'Cairo University, Hall 12',
    start_time: '2023-10-25T10:00:00Z',
    end_time: '2023-10-25T16:00:00Z',
    capacity: 50,
    registration_deadline: '2023-10-20T23:59:59Z',
    created_by: 'admin',
    created_at: '2023-09-01T00:00:00Z',
    updated_at: '2023-09-01T00:00:00Z',
  };

  // Fetch event data (using mock data for testing)
  const { data: event, isLoading, isError } = useEvent(id || '', false); // Disabled API call
  const mockEvent = MOCK_EVENT; // Use mock data

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Comment out loading state for testing
  if (false && isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-10 w-32 bg-gray-200 rounded-lg mb-8" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="h-96 bg-gray-200 rounded-3xl" />
                <div className="h-64 bg-gray-200 rounded-2xl" />
              </div>
              <div className="space-y-6">
                <div className="h-80 bg-gray-200 rounded-2xl" />
                <div className="h-96 bg-gray-200 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Comment out error state for testing
  if (false && (isError || !event)) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Event Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The event you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <HiArrowLeft className="w-5 h-5" />
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Transform mock event data with rich content
  const eventData = {
    title: mockEvent.title,
    description: mockEvent.description,
    location: mockEvent.location,
    date: formatDate(mockEvent.start_time),
    time: formatTime(mockEvent.start_time),
    endTime: formatTime(mockEvent.end_time),
    registrationDeadline: mockEvent.registration_deadline,
    category: 'Workshop',
    categoryBadge: 'WORKSHOP',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
    about: `This workshop dives deep into the fundamentals of autonomous systems. Participants will gain hands-on experience with ROS2 (Robot Operating System 2), understanding how to integrate various sensors such as LIDAR and depth cameras for real-time path planning and navigation.

Designed for engineering students and hobbyists, this session bridges the gap between theoretical robotics concepts and practical application. You will work in small teams to program a mobile robot to navigate a maze autonomously.

Throughout the workshop, you'll explore cutting-edge techniques in robotics, including sensor fusion, simultaneous localization and mapping (SLAM), and path planning algorithms. Our expert instructors will guide you through each concept with live demonstrations and interactive coding sessions.`,
    learningPoints: [
      'ROS2 architecture and node communication',
      'Sensor fusion techniques for state estimation',
      'SLAM (Simultaneous Localization and Mapping)',
      'Path planning algorithms (A*, Dijkstra)',
      'Hardware interfacing with Raspberry Pi',
      'Debugging with RViz and Gazebo',
    ],
    prerequisites: [
      'Basic knowledge of Python or C++ is required. Familiarity with Linux command line is recommended but not mandatory. Please bring your own laptop with Ubuntu 20.04 or later installed (VM is acceptable).',
      'Python programming basics',
      'Understanding of object-oriented programming',
      'Linux terminal familiarity',
    ],
    instructor: {
      name: 'Eng. Ahmed Hassan',
      title: 'Senior Robotics Engineer',
    },
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/events')}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <HiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back to Events</span>
        </motion.button>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <EventDetailsHero
              title={eventData.title}
              description={eventData.description}
              image={eventData.image}
              category={eventData.category}
              categoryBadge={eventData.categoryBadge}
            />

            {/* Content Section */}
            <EventDetailsContent
              about={eventData.about}
              learningPoints={eventData.learningPoints}
              prerequisites={eventData.prerequisites}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <EventDetailsSidebar
                date={eventData.date}
                time={eventData.time}
                endTime={eventData.endTime}
                location={eventData.location}
                instructor={eventData.instructor}
                registrationDeadline={eventData.registrationDeadline}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
