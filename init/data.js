const sampleListings = [
  {
    _id: "68e2c534b73e47024570a9d0",
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Goa",
    country: "India",
    category: "beach",
    reviews: ["68e430e116e2068799126eef"],
    geometry: {
      type: "Point",
      coordinates: [73.8278, 15.4909]
    },
    createdAt: new Date("2024-01-15T08:00:00.000Z"),
    owner: "68e2c4ecb73e47024570a9c9",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d1",
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Mumbai",
    country: "India",
    category: "iconic-cities",
    reviews: ["68e430e116e2068799126ef0"],
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.0760]
    },
    createdAt: new Date("2024-01-16T09:30:00.000Z"),
    owner: "68e2c4ecb73e47024570a9ca",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d2",
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Manali",
    country: "India",
    category: "mountains",
    reviews: ["68e430e116e2068799126ef1"],
    geometry: {
      type: "Point",
      coordinates: [77.1734, 32.2396]
    },
    createdAt: new Date("2024-01-17T10:15:00.000Z"),
    owner: "68e2c4ecb73e47024570a9cb",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d3",
    title: "Historic Villa in Rajasthan",
    description: "Experience the charm of Rajasthan in this beautifully restored heritage villa. Explore the royal architecture and culture.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Udaipur",
    country: "India",
    category: "heritage",
    reviews: ["68e430e116e2068799126ef2"],
    geometry: {
      type: "Point",
      coordinates: [73.7125, 24.5854]
    },
    createdAt: new Date("2024-01-18T11:20:00.000Z"),
    owner: "68e2c4ecb73e47024570a9cc",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d4",
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Wayanad",
    country: "India",
    category: "unique-stays",
    reviews: ["68e430e116e2068799126ef3"],
    geometry: {
      type: "Point",
      coordinates: [76.0810, 11.6854]
    },
    createdAt: new Date("2024-01-19T12:45:00.000Z"),
    owner: "68e2c4ecb73e47024570a9cd",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d5",
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Kovalam",
    country: "India",
    category: "beach",
    reviews: ["68e430e116e2068799126ef4"],
    geometry: {
      type: "Point",
      coordinates: [76.9784, 8.3661]
    },
    createdAt: new Date("2024-01-20T14:00:00.000Z"),
    owner: "68e2c4ecb73e47024570a9ce",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d6",
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Nainital",
    country: "India",
    category: "lake",
    reviews: ["68e430e116e2068799126ef5"],
    geometry: {
      type: "Point",
      coordinates: [79.4543, 29.3803]
    },
    createdAt: new Date("2024-01-21T15:30:00.000Z"),
    owner: "68e2c4ecb73e47024570a9cf",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d7",
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Delhi",
    country: "India",
    category: "luxury",
    reviews: ["68e430e116e2068799126ef6"],
    geometry: {
      type: "Point",
      coordinates: [77.2090, 28.6139]
    },
    createdAt: new Date("2024-01-22T16:45:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d0",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d8",
    title: "Mountain View Cabin",
    description: "Enjoy breathtaking mountain views from this cozy cabin in the Himalayas.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Shimla",
    country: "India",
    category: "mountains",
    reviews: ["68e430e116e2068799126ef7"],
    geometry: {
      type: "Point",
      coordinates: [77.1734, 31.1048]
    },
    createdAt: new Date("2024-01-23T17:20:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d1",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9d9",
    title: "Wildlife Resort near National Park",
    description: "Experience the thrill of the wild in a comfortable resort. Witness exotic wildlife up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Ranthambore",
    country: "India",
    category: "wildlife",
    reviews: ["68e430e116e2068799126ef8"],
    geometry: {
      type: "Point",
      coordinates: [76.3847, 26.0173]
    },
    createdAt: new Date("2024-01-24T18:10:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d2",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9da",
    title: "Historic Houseboat",
    description: "Stay in a piece of history in this beautifully preserved houseboat in Kerala's backwaters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Alleppey",
    country: "India",
    category: "unique-stays",
    reviews: ["68e430e116e2068799126ef9"],
    geometry: {
      type: "Point",
      coordinates: [76.3388, 9.4981]
    },
    createdAt: new Date("2024-01-25T19:30:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d3",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9db",
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D%auto=format&fit=crop&w=800&q=60",
    },
    price: 10000,
    location: "Lakshadweep",
    country: "India",
    category: "luxury",
    reviews: ["68e430e116e2068799126efa"],
    geometry: {
      type: "Point",
      coordinates: [72.6383, 10.5667]
    },
    createdAt: new Date("2024-01-26T20:15:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d4",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9dc",
    title: "Charming Cottage in the Hills",
    description: "Escape to the picturesque hills in this quaint and charming cottage with amazing views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Darjeeling",
    country: "India",
    category: "mountains",
    reviews: ["68e430e116e2068799126efb"],
    geometry: {
      type: "Point",
      coordinates: [88.2636, 27.0360]
    },
    createdAt: new Date("2024-01-27T21:00:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d5",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9dd",
    title: "Historic Haveli in Pink City",
    description: "Step back in time in this elegant historic haveli located in the heart of Jaipur.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Jaipur",
    country: "India",
    category: "heritage",
    reviews: ["68e430e116e2068799126efc"],
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124]
    },
    createdAt: new Date("2024-01-28T22:30:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d6",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9de",
    title: "Serene Backwater Villa",
    description: "Experience the tranquility of Kerala's backwaters in this traditional villa. Perfect for a peaceful retreat with stunning water views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Kumarakom",
    country: "India",
    category: "lake",
    reviews: ["68e430e116e2068799126efd"],
    geometry: {
      type: "Point",
      coordinates: [76.4333, 9.6167]
    },
    createdAt: new Date("2024-01-29T08:15:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d7",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9df",
    title: "Royal Palace Suite",
    description: "Live like royalty in this opulent palace suite in Mysore. Experience the grandeur of Indian architecture and luxury.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Mysore",
    country: "India",
    category: "luxury",
    reviews: ["68e430e116e2068799126efe"],
    geometry: {
      type: "Point",
      coordinates: [76.6394, 12.2958]
    },
    createdAt: new Date("2024-01-30T10:30:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d8",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e0",
    title: "Desert Camp Adventure",
    description: "Sleep under the stars in the Thar Desert. Experience authentic Rajasthani culture with camel rides and folk performances.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Jaisalmer",
    country: "India",
    category: "unique-stays",
    reviews: ["68e430e116e2068799126eff"],
    geometry: {
      type: "Point",
      coordinates: [70.9029, 26.9157]
    },
    createdAt: new Date("2024-01-31T14:45:00.000Z"),
    owner: "68e2c4ecb73e47024570a9d9",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e1",
    title: "Tiger Reserve Lodge",
    description: "Stay in the heart of Bandhavgarh National Park. Wake up to the sounds of nature and spot majestic tigers in their natural habitat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Bandhavgarh",
    country: "India",
    category: "wildlife",
    reviews: ["68e430e116e2068799126f00"],
    geometry: {
      type: "Point",
      coordinates: [81.1167, 23.6833]
    },
    createdAt: new Date("2024-02-01T16:20:00.000Z"),
    owner: "68e2c4ecb73e47024570a9da",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e2",
    title: "Coastal Beach House",
    description: "Wake up to the sound of waves in this charming beach house. Perfect for beach lovers with direct access to pristine sands.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Gokarna",
    country: "India",
    category: "beach",
    reviews: ["68e430e116e2068799126f01"],
    geometry: {
      type: "Point",
      coordinates: [74.3167, 14.5500]
    },
    createdAt: new Date("2024-02-02T18:10:00.000Z"),
    owner: "68e2c4ecb73e47024570a9db",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e3",
    title: "Hill Station Retreat",
    description: "Escape to the cool climes of Coorg. Surrounded by coffee plantations and misty hills, this retreat offers perfect relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Coorg",
    country: "India",
    category: "mountains",
    reviews: ["68e430e116e2068799126f02"],
    geometry: {
      type: "Point",
      coordinates: [75.7333, 12.4167]
    },
    createdAt: new Date("2024-02-03T20:30:00.000Z"),
    owner: "68e2c4ecb73e47024570a9dc",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e4",
    title: "Metropolitan Penthouse",
    description: "Luxury living in the heart of Bangalore. This modern penthouse offers stunning city views and premium amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Bangalore",
    country: "India",
    category: "iconic-cities",
    reviews: ["68e430e116e2068799126f03"],
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716]
    },
    createdAt: new Date("2024-02-04T22:15:00.000Z"),
    owner: "68e2c4ecb73e47024570a9dd",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e5",
    title: "Ancient Temple Stay",
    description: "Experience spiritual tranquility in this heritage property near ancient temples. Perfect for cultural immersion and meditation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Varanasi",
    country: "India",
    category: "heritage",
    reviews: ["68e430e116e2068799126f04"],
    geometry: {
      type: "Point",
      coordinates: [82.9569, 25.3176]
    },
    createdAt: new Date("2024-02-05T09:45:00.000Z"),
    owner: "68e2c4ecb73e47024570a9de",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e6",
    title: "Floating Houseboat",
    description: "Unique accommodation on a traditional houseboat in Srinagar's Dal Lake. Experience Kashmir's beauty from the water.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Srinagar",
    country: "India",
    category: "unique-stays",
    reviews: ["68e430e116e2068799126f05"],
    geometry: {
      type: "Point",
      coordinates: [74.7973, 34.0837]
    },
    createdAt: new Date("2024-02-06T11:20:00.000Z"),
    owner: "68e2c4ecb73e47024570a9df",
    __v: 0
  },
  {
    _id: "68e2c534b73e47024570a9e7",
    title: "Elephant Sanctuary Lodge",
    description: "Stay near an ethical elephant sanctuary in Kerala. Learn about elephant conservation while enjoying nature's beauty.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Thekkady",
    country: "India",
    category: "wildlife",
    reviews: ["68e430e116e2068799126f06"],
    geometry: {
      type: "Point",
      coordinates: [77.1667, 9.5833]
    },
    createdAt: new Date("2024-02-07T13:50:00.000Z"),
    owner: "68e2c4ecb73e47024570a9e0",
    __v: 0
  }
];
module.exports = { data: sampleListings };