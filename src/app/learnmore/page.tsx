import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Heart,
  Target,
  Globe,
  HandshakeIcon,
} from "lucide-react";

const LearnMorePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Glorious Priesthood Assembly
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover our mission, values, and the impact we're making in our
            community
          </p>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-gray-600">
                  To raise a generation of believers who are deeply rooted in
                  God's word, empowered by the Holy Spirit, and committed to
                  transforming their world through the gospel of Jesus Christ.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-gray-600">
                  To spread the gospel of Jesus Christ, disciple believers, and
                  establish a spirit-filled community that impacts lives through
                  biblical teaching, worship, and outreach.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <BookOpen className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">
                    Biblical Teaching
                  </h3>
                  <p className="text-gray-600">
                    We are committed to sound biblical teaching that equips
                    believers for spiritual growth and effective ministry.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Community</h3>
                  <p className="text-gray-600">
                    We foster genuine relationships and create an environment
                    where everyone feels welcomed, loved, and supported.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <HandshakeIcon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">
                    Spirit-Led Worship
                  </h3>
                  <p className="text-gray-600">
                    We believe in dynamic, Spirit-led worship that creates an
                    atmosphere for divine encounters and transformation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">When You Visit</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Warm Welcome</strong>
                    <p className="text-gray-600">
                      Our ushers and greeters will welcome you and help you find
                      your way around.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Engaging Service</strong>
                    <p className="text-gray-600">
                      Experience uplifting worship and practical, Bible-based
                      teaching.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Fellowship</strong>
                    <p className="text-gray-600">
                      Connect with others and become part of our church family.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnMorePage;
