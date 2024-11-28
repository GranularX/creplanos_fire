import React from 'react';

export function API() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#8E2DE2] via-[#4A00E0] to-[#F77062] pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">API Documentation</h1>
        <p className="text-lg text-white text-center mb-16">
          Access our services programmatically with our RESTful APIs. Below is a guide to get you started.
        </p>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: 'Get Service List',
              method: 'GET',
              endpoint: '/api/services',
              description: 'Retrieve a list of all available services.',
              requestExample: `curl -X GET https://example.com/api/services`,
              responseExample: `[
  {
    "id": 1,
    "name": "Web Design",
    "description": "Create stunning websites.",
    "price": 1500
  },
  {
    "id": 2,
    "name": "UI/UX Design",
    "description": "Design beautiful user interfaces.",
    "price": 2000
  }
]`,
            },
            {
              title: 'Get Service Details',
              method: 'GET',
              endpoint: '/api/services/{id}',
              description: 'Retrieve details about a specific service.',
              requestExample: `curl -X GET https://example.com/api/services/1`,
              responseExample: `{
  "id": 1,
  "name": "Web Design",
  "description": "Create stunning websites.",
  "price": 1500,
  "features": ["Responsive", "Modern Design", "SEO Optimized"]
}`,
            },
            {
              title: 'Create a Service',
              method: 'POST',
              endpoint: '/api/services',
              description: 'Add a new service to the platform.',
              requestExample: `curl -X POST https://example.com/api/services \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Graphic Design",
    "description": "Design compelling graphics.",
    "price": 1200
}'`,
              responseExample: `{
  "id": 3,
  "name": "Graphic Design",
  "description": "Design compelling graphics.",
  "price": 1200,
  "createdAt": "2024-11-28T12:00:00Z"
}`,
            },
            {
              title: 'Delete a Service',
              method: 'DELETE',
              endpoint: '/api/services/{id}',
              description: 'Delete an existing service by ID.',
              requestExample: `curl -X DELETE https://example.com/api/services/3`,
              responseExample: `{
  "message": "Service deleted successfully."
}`,
            },
          ].map((api) => (
            <div
              key={api.title}
              className="glass-card p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    api.method === 'GET'
                      ? 'bg-blue-500/20 text-blue-400'
                      : api.method === 'POST'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {api.method}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{api.title}</h3>
              <p className="text-gray-300 mb-4">{api.description}</p>
              <div className="mb-4">
                <span className="text-sm text-gray-400 block">Endpoint:</span>
                <code className="text-white bg-gray-800 px-3 py-1 rounded-md text-sm block">
                  {api.endpoint}
                </code>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-400 block">Request Example:</span>
                <pre className="text-white bg-gray-800 px-3 py-2 rounded-md text-sm overflow-auto">
                  {api.requestExample}
                </pre>
              </div>
              <div>
                <span className="text-sm text-gray-400 block">Response Example:</span>
                <pre className="text-white bg-gray-800 px-3 py-2 rounded-md text-sm overflow-auto">
                  {api.responseExample}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
