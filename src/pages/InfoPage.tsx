import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Users, Home, Heart, BookOpen, Phone, Globe, FileText } from 'lucide-react';

interface InfoPageProps {
  title: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ title }) => {
  const getPageContent = (pageTitle: string) => {
    switch (pageTitle) {
      case 'Help Center':
        return {
          icon: <Phone className="h-12 w-12 text-rose-500" />,
          description: 'Get help with your bookings, account, and more. Our support team is here to assist you 24/7.',
          sections: [
            {
              title: 'Booking Support',
              content: 'Need help with your reservation? Find answers to common booking questions, modification policies, and cancellation procedures.'
            },
            {
              title: 'Account Management',
              content: 'Learn how to update your profile, manage payment methods, and adjust your account settings for the best experience.'
            },
            {
              title: 'Host Resources',
              content: 'Comprehensive guides for hosts including listing optimization, guest communication, and property management best practices.'
            }
          ]
        };

      case 'Safety Information':
        return {
          icon: <Shield className="h-12 w-12 text-rose-500" />,
          description: 'Your safety is our top priority. Learn about our safety measures and how to stay secure while traveling.',
          sections: [
            {
              title: 'Verified Listings',
              content: 'All properties undergo verification processes to ensure they meet our safety and quality standards before being listed on our platform.'
            },
            {
              title: 'Secure Payments',
              content: 'Your payment information is protected with industry-standard encryption and secure payment processing systems.'
            },
            {
              title: 'Emergency Support',
              content: '24/7 emergency support line available for urgent safety concerns during your stay. Contact us immediately if you need assistance.'
            }
          ]
        };

      case 'Diversity & Belonging':
        return {
          icon: <Users className="h-12 w-12 text-rose-500" />,
          description: 'We believe that everyone should feel welcome and included. Learn about our commitment to diversity and belonging.',
          sections: [
            {
              title: 'Inclusive Community',
              content: 'We foster an environment where people of all backgrounds, identities, and experiences feel valued and respected.'
            },
            {
              title: 'Anti-Discrimination Policy',
              content: 'Zero tolerance for discrimination based on race, religion, gender, sexual orientation, or any other protected characteristic.'
            },
            {
              title: 'Accessibility Commitment',
              content: 'Continuously improving our platform and services to be accessible to users with disabilities and diverse needs.'
            }
          ]
        };

      case 'Host Your Home':
        return {
          icon: <Home className="h-12 w-12 text-rose-500" />,
          description: 'Turn your space into a source of income. Learn how to become a successful host and welcome travelers from around the world.',
          sections: [
            {
              title: 'Getting Started',
              content: 'Step-by-step guide to creating your first listing, setting competitive prices, and preparing your space for guests.'
            },
            {
              title: 'Hosting Best Practices',
              content: 'Tips for providing exceptional guest experiences, managing bookings, and maintaining high ratings and reviews.'
            },
            {
              title: 'Earnings & Payouts',
              content: 'Understand how payments work, when you get paid, and strategies to maximize your hosting income potential.'
            }
          ]
        };

      case 'Privacy Policy':
        return {
          icon: <Shield className="h-12 w-12 text-rose-500" />,
          description: 'Learn how we collect, use, and protect your personal information. Your privacy matters to us.',
          sections: [
            {
              title: 'Information We Collect',
              content: 'Details about the types of information we collect when you use our services, including account data and usage analytics.'
            },
            {
              title: 'How We Use Your Data',
              content: 'Explanation of how we use your information to provide services, improve user experience, and ensure platform security.'
            },
            {
              title: 'Your Privacy Rights',
              content: 'Information about your rights regarding your personal data, including access, correction, and deletion options.'
            }
          ]
        };

      case 'Terms of Service':
        return {
          icon: <FileText className="h-12 w-12 text-rose-500" />,
          description: 'Important legal terms that govern your use of our platform. Please read carefully.',
          sections: [
            {
              title: 'User Responsibilities',
              content: 'Your obligations as a user of our platform, including account security, accurate information, and respectful behavior.'
            },
            {
              title: 'Booking Terms',
              content: 'Terms and conditions related to making reservations, cancellations, modifications, and payment processing.'
            },
            {
              title: 'Dispute Resolution',
              content: 'Procedures for resolving conflicts between users, including mediation processes and legal considerations.'
            }
          ]
        };

      default:
        return {
          icon: <BookOpen className="h-12 w-12 text-rose-500" />,
          description: 'Find comprehensive information and resources to help you make the most of our platform.',
          sections: [
            {
              title: 'Getting Started',
              content: 'New to our platform? Learn the basics of creating an account, making your first booking, and navigating our services.'
            },
            {
              title: 'Platform Features',
              content: 'Discover all the features available to enhance your experience, from advanced search filters to personalized recommendations.'
            },
            {
              title: 'Community Guidelines',
              content: 'Learn about our community standards and how we maintain a safe, respectful environment for all users.'
            }
          ]
        };
    }
  };

  const content = getPageContent(title);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {content.icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {content.sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-8 text-white text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-rose-200" />
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-rose-100 mb-6 text-lg">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-rose-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
            <Link 
              to="/help-center"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-rose-600 transition-colors"
            >
              Visit Help Center
            </Link>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/help-center" 
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Phone className="h-8 w-8 text-rose-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
            <p className="text-gray-600 text-sm">Get support and find answers to common questions</p>
          </Link>
          
          <Link 
            to="/safety" 
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Shield className="h-8 w-8 text-rose-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Safety</h3>
            <p className="text-gray-600 text-sm">Learn about our safety measures and policies</p>
          </Link>
          
          <Link 
            to="/diversity" 
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
          >
            <Users className="h-8 w-8 text-rose-500 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600 text-sm">Our commitment to diversity and inclusion</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;