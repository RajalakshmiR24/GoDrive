let blogs = [
    {
    "_id": {
      "$oid": "66d579d2567a2d4498c3edb1"
    },
    "img": "https://miro.medium.com/v2/resize:fit:828/format:webp/1*-P0xXbZqGpY1H24jbStLQg.jpeg",
    "title": "Differential Backups in MyRocks-Based Distributed Databases at Go Drive",
    "content": {
      "heading": "Strategies for Getting More Rides",
      "subheadings": [
        {
          "subheading": "Introduction to Differential Backups",
          "subsection_content": "Differential backups are an essential part of the backup strategy in distributed databases. Unlike full backups, which copy all the data from the database, differential backups only capture the data that has changed since the last full backup. This approach helps reduce the amount of data that needs to be copied and stored, making backups quicker and less resource-intensive."
        },
        {
          "subheading": "Why MyRocks?",
          "subsection_content": "MyRocks is a storage engine for MySQL, optimized for SSDs and designed to offer better write performance and space efficiency. For Go Drive's distributed database infrastructure, MyRocks provides the necessary balance between high performance and storage efficiency, crucial for handling large-scale data with frequent updates."
        },
        {
          "subheading": "Implementing Differential Backups in MyRocks",
          "subsection_content": [
            {
              "subheading": "Identifying Changes",
              "subsection_content": "MyRocks leverages a write-optimized storage format, which makes it efficient to identify changes between backups. Changes are tracked using RocksDB’s compaction process, which consolidates and optimizes the storage files. For differential backups, you can track the modifications in SST (Sorted String Table) files since the last full backup."
            },
            {
              "subheading": "Backup Scheduling",
              "subsection_content": "A combination of full and differential backups is typically scheduled to optimize data protection and recovery time objectives (RTO). Full backups are less frequent and capture the entire dataset, while differential backups are more frequent and focus only on the changes. For Go Drive, a typical schedule might involve weekly full backups and daily differential backups."
            },
            {
              "subheading": "Data Consistency Across Nodes",
              "subsection_content": "In a distributed database setup, ensuring data consistency across all nodes during backup is critical. This can be achieved by implementing snapshot mechanisms that lock the database state at a specific point in time, allowing consistent differential backups across all nodes. MyRocks supports consistent snapshots, which makes it easier to coordinate differential backups across Go Drive's distributed database system."
            },
            {
              "subheading": "Storage and Resource Optimization",
              "subsection_content": "Differential backups are smaller in size compared to full backups, significantly reducing storage requirements. Additionally, because only the changes are backed up, the process consumes fewer I/O resources, reducing the impact on database performance. This is particularly beneficial for Go Drive, where high availability and performance are paramount."
            },
            {
              "subheading": "Restoration Process",
              "subsection_content": "In the event of a data loss or corruption, restoring from differential backups involves first applying the most recent full backup followed by the relevant differential backups. This layered approach ensures that the restoration process is efficient, minimizing downtime and data loss."
            },
            {
              "subheading": "Automation and Monitoring",
              "subsection_content": "Automating the backup process and monitoring its performance is crucial for ensuring the reliability of the backup strategy. Tools and scripts can be used to automate the differential backup process, and monitoring systems can alert administrators of any issues or failures in real-time, allowing for prompt corrective actions."
            }
          ]
        }
      ],
      "conclusion": "Differential backups in a MyRocks-based distributed database provide an efficient and reliable way to protect data while minimizing resource usage. For Go Drive, this strategy ensures high availability, quick recovery times, and optimized storage usage, all of which are critical for maintaining a seamless user experience. By implementing a well-structured backup strategy that includes differential backups, Go Drive can safeguard its data against potential losses while maintaining optimal performance across its distributed database infrastructure."
    },
    "date": "30 July / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d57adb567a2d4498c3edb3"
    },
    "img": "https://i.ibb.co/Wgz0KJC/car.jpg",
    "title": "How to Maximize Your Earnings as a Go Drive Driver",
    "content": {
      "heading": "Strategies for Getting More Rides",
      "subheadings": [
        {
          "subheading": "Driving During Peak Hours",
          "subsection_content": "Learn the best times to drive to maximize your ride frequency and earnings. Peak hours often coincide with morning and evening commutes, as well as weekends."
        },
        {
          "subheading": "Optimizing Your Location",
          "subsection_content": "Position yourself in high-demand areas to increase your chances of getting rides. This includes popular neighborhoods, business districts, and event venues."
        }
      ],
      "heading2": "Tips for Providing Excellent Customer Service",
      "subheadings2": [
        {
          "subheading": "Maintaining a Clean Vehicle",
          "subsection_content": "A clean car improves passenger experience and can lead to higher tips. Keep your vehicle tidy and regularly check for cleanliness."
        },
        {
          "subheading": "Being Polite and Helpful",
          "subsection_content": "Engage politely with passengers and offer assistance when needed. Positive interactions can improve ratings and tips."
        }
      ],
      "conclusion": "Implementing these strategies can lead to higher tips, better ratings, and increased earnings as a Go Drive driver."
    },
    "date": "30 July / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d58a9a567a2d4498c3edb8"
    },
    "img": "https://i.ibb.co/9V2MTpB/bike1.jpg",
    "title": "The Ultimate Guide to Becoming a Go Drive Driver",
    "content": {
      "heading": "Step-by-Step Application Process",
      "subheadings": [
        {
          "subheading": "Initial Application",
          "subsection_content": "Start by filling out the online application form with your personal details and vehicle information."
        },
        {
          "subheading": "Background Checks",
          "subsection_content": "Understand the importance of background checks and what they entail, including driving record and criminal background screening."
        }
      ],
      "heading2": "Essential Requirements and Qualifications",
      "subheadings2": [
        {
          "subheading": "Age and Experience",
          "subsection_content": "Learn about the minimum age requirements and necessary driving experience needed to qualify as a Go Drive driver."
        },
        {
          "subheading": "Vehicle Condition",
          "subsection_content": "Ensure your vehicle meets Go Drive’s standards for safety, comfort, and appearance."
        }
      ],
      "conclusion": "This guide provides a comprehensive overview of what you need to successfully join and thrive as a Go Drive driver."
    },
    "date": "14 July / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d595c7567a2d4498c3edba"
    },
    "img": "https://i.ibb.co/G284G0N/auto2.jpg",
    "title": "Safety First: Go Drive’s Commitment to Passenger and Driver Safety",
    "content": {
      "heading": "Safety Features in the Go Drive App",
      "subheadings": [
        {
          "subheading": "Real-Time Tracking",
          "subsection_content": "The app offers real-time tracking to monitor ride progress and ensure safety. This feature helps passengers and drivers stay informed during the journey."
        },
        {
          "subheading": "Emergency Buttons",
          "subsection_content": "Learn how to use the emergency buttons to quickly alert authorities or Go Drive support in case of an emergency."
        }
      ],
      "heading2": "How Go Drive Ensures Safe Rides for Everyone",
      "subheadings2": [
        {
          "subheading": "Regular Vehicle Inspections",
          "subsection_content": "Go Drive requires periodic vehicle inspections to ensure all cars meet safety standards. Learn what is checked during these inspections."
        },
        {
          "subheading": "Stringent Background Checks",
          "subsection_content": "Understand the comprehensive background checks performed on all drivers to maintain a safe environment for both passengers and drivers."
        }
      ],
      "conclusion": "Go Drive prioritizes safety with robust features and protocols, ensuring a secure ride experience for all users."
    },
    "date": "28 Jun / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d595eb567a2d4498c3edbc"
    },
    "img": "https://i.ibb.co/MV90Tp9/auto.jpg",
    "title": "Top Tips for a Smooth Ride with Go Drive",
    "content": {
      "heading": "How to Use the Go Drive App Effectively",
      "subheadings": [
        {
          "subheading": "Scheduling Rides",
          "subsection_content": "Discover how to schedule rides in advance to ensure timely pickups and avoid last-minute hassles."
        },
        {
          "subheading": "Tracking Your Driver’s Progress",
          "subsection_content": "Learn how to use the app’s tracking feature to monitor your driver’s location and estimated time of arrival."
        }
      ],
      "heading2": "What to Do if You Encounter an Issue During a Ride",
      "subheadings2": [
        {
          "subheading": "Contacting Support",
          "subsection_content": "Find out how to quickly get in touch with Go Drive support in case of any issues or emergencies during your ride."
        },
        {
          "subheading": "Providing Feedback",
          "subsection_content": "Learn the importance of providing feedback to help Go Drive improve its services and resolve any issues."
        }
      ],
      "conclusion": "Following these tips ensures a hassle-free experience with Go Drive, enhancing your overall satisfaction and comfort."
    },
    "date": "10 Jun / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d59617567a2d4498c3edbe"
    },
    "img": "https://i.ibb.co/zrnQDSs/car2.jpg",
    "title": "How Go Drive is Revolutionizing Urban Transportation",
    "content": {
      "heading": "The Impact of Ride-Sharing on City Traffic",
      "subheadings": [
        {
          "subheading": "Reducing Traffic Congestion",
          "subsection_content": "Ride-sharing services reduce the number of vehicles on the road by promoting shared rides. This leads to decreased traffic congestion, especially in densely populated urban areas."
        },
        {
          "subheading": "Optimizing Vehicle Usage",
          "subsection_content": "By matching passengers going in the same direction, ride-sharing maximizes vehicle usage, reducing the need for personal car ownership and lowering overall traffic volumes."
        }
      ],
      "heading2": "Future Innovations in Ride-Sharing Technology",
      "subheadings2": [
        {
          "subheading": "Electric Vehicles (EVs)",
          "subsection_content": "The adoption of EVs in ride-sharing fleets is on the rise, contributing to lower emissions and sustainable urban mobility. Go Drive is exploring partnerships with EV manufacturers to expand its fleet."
        },
        {
          "subheading": "Autonomous Driving",
          "subsection_content": "Autonomous vehicles are set to revolutionize ride-sharing by enhancing safety, reducing costs, and improving efficiency. Go Drive is testing autonomous driving technologies to prepare for this future shift."
        }
      ],
      "conclusion": "Go Drive is at the forefront of urban transportation innovation, using technology and strategic planning to reduce traffic congestion and lead the industry into a future of sustainable and efficient mobility."
    },
    "date": "27 May / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d59638567a2d4498c3edc0"
    },
    "img": "https://i.ibb.co/Qf78SKd/bike.jpg",
    "title": "Eco-Friendly Travel: Go Drive’s Green Initiatives",
    "content": {
      "heading": "Promoting Electric and Hybrid Vehicles",
      "subheadings": [
        {
          "subheading": "Integrating Eco-Friendly Vehicles",
          "subsection_content": "Go Drive is actively incorporating electric and hybrid vehicles into its fleet, reducing its carbon footprint and promoting sustainable travel options."
        },
        {
          "subheading": "Benefits of Green Fleets",
          "subsection_content": "Green fleets not only reduce emissions but also offer quieter, more comfortable rides. They are a key component of Go Drive's commitment to environmental stewardship."
        }
      ],
      "heading2": "How Ride-Sharing Reduces Carbon Footprints",
      "subheadings2": [
        {
          "subheading": "Shared Rides for Lower Emissions",
          "subsection_content": "By facilitating shared rides, Go Drive helps reduce the number of vehicles on the road, which in turn lowers total carbon emissions and promotes a healthier environment."
        },
        {
          "subheading": "Encouraging Eco-Friendly Practices",
          "subsection_content": "Go Drive encourages drivers and passengers to adopt eco-friendly practices, such as opting for electric rides and reducing unnecessary idling."
        }
      ],
      "conclusion": "Go Drive is dedicated to reducing its environmental impact through green initiatives, making eco-friendly travel accessible and appealing to all its users."
    },
    "date": "11 May / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d59657567a2d4498c3edc2"
    },
    "img": "https://i.ibb.co/zPN0mPN/car1.jpg",
    "title": "Customer Stories: Memorable Experiences with Go Drive",
    "content": {
      "heading": "Heartwarming Tales from Our Riders",
      "subheadings": [
        {
          "subheading": "Special Moments During Rides",
          "subsection_content": "Passengers share unique stories of special moments they've experienced during their rides with Go Drive, from unexpected reunions to acts of kindness."
        },
        {
          "subheading": "Exceptional Service",
          "subsection_content": "Riders often highlight the exceptional service provided by Go Drive drivers, emphasizing their professionalism, friendliness, and attention to detail."
        }
      ],
      "heading2": "Driver Stories: Going Above and Beyond",
      "subheadings2": [
        {
          "subheading": "Acts of Kindness",
          "subsection_content": "Learn about Go Drive drivers who have gone above and beyond, offering assistance in emergencies or going out of their way to ensure a passenger’s safety."
        },
        {
          "subheading": "Building Connections",
          "subsection_content": "Many drivers build meaningful connections with their passengers, creating a positive and memorable experience that goes beyond a typical ride."
        }
      ],
      "conclusion": "These stories illustrate the human side of ride-sharing, showcasing how Go Drive fosters meaningful interactions and memorable experiences for both drivers and passengers."
    },
    "date": "30 Apr / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d59674567a2d4498c3edc4"
    },
    "img": "https://i.ibb.co/ZVDRPDQ/bike3.jpg",
    "title": "Comparing Go Drive to Other Ride-Sharing Apps",
    "content": {
      "heading": "Key Features and Benefits",
      "subheadings": [
        {
          "subheading": "Competitive Pricing",
          "subsection_content": "Go Drive offers competitive pricing with transparent fare structures, making it an attractive choice for budget-conscious riders."
        },
        {
          "subheading": "Superior App Functionality",
          "subsection_content": "The Go Drive app is user-friendly, offering features like ride scheduling, real-time tracking, and multiple payment options to enhance user experience."
        }
      ],
      "heading2": "Why Choose Go Drive Over Competitors",
      "subheadings2": [
        {
          "subheading": "Quality of Service",
          "subsection_content": "Go Drive stands out with its high-quality service, including well-maintained vehicles and professional drivers, ensuring a safe and pleasant ride every time."
        },
        {
          "subheading": "Unique Benefits",
          "subsection_content": "From loyalty programs to exclusive discounts, Go Drive provides unique benefits that make it a preferred choice among users."
        }
      ],
      "conclusion": "When choosing a ride-sharing service, Go Drive offers a compelling combination of affordability, quality, and user-centric features that set it apart from the competition."
    },
    "date": "14 Apr / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d596da567a2d4498c3edc6"
    },
    "img": "https://i.ibb.co/sPVGRvd/auto3.jpg",
    "title": "Navigating Go Drive’s Payment System",
    "content": {
      "heading": "Understanding Fares and Charges",
      "subheadings": [
        {
          "subheading": "Fare Calculation",
          "subsection_content": "Learn how Go Drive calculates fares based on a combination of base rates, distance traveled, and time spent in traffic. Understanding these components helps riders anticipate costs better."
        },
        {
          "subheading": "Additional Charges",
          "subsection_content": "Familiarize yourself with potential additional charges, such as surcharges for peak times or special requests, to avoid surprises on your bill."
        }
      ],
      "heading2": "How to Resolve Payment Issues",
      "subheadings2": [
        {
          "subheading": "Handling Billing Discrepancies",
          "subsection_content": "If you notice a discrepancy in your fare, Go Drive’s customer support is available 24/7 to assist with billing questions and corrections."
        },
        {
          "subheading": "Addressing Failed Transactions",
          "subsection_content": "Learn what to do if your payment fails due to network issues or declined cards. The app provides clear instructions on how to update payment information or retry transactions."
        }
      ],
      "conclusion": "Go Drive aims to provide a transparent and user-friendly payment experience, ensuring all riders have clear visibility into fare calculations and a smooth process for resolving any payment issues."
    },
    "date": "29 Mar / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d5971d567a2d4498c3edc8"
    },
    "img": "https://i.ibb.co/c3dFNDn/bike5.jpg",
    "title": "Go Drive’s Partnership with Local Businesses",
    "content": {
      "heading": "Exclusive Deals and Discounts for Riders",
      "subheadings": [
        {
          "subheading": "Understanding the Benefits",
          "subsection_content": "Go Drive has partnered with various local businesses to offer riders exclusive deals and discounts. This initiative aims to provide added value to users while supporting local enterprises."
        },
        {
          "subheading": "Rider Benefits",
          "subsection_content": "Riders can enjoy discounts on their favorite products and services simply by using Go Drive. This collaboration is a win-win, bringing more customers to businesses and offering savings to riders."
        }
      ],
      "heading2": "How Businesses Benefit from Partnering with Go Drive",
      "subheadings2": [
        {
          "subheading": "Boosting Visibility and Customer Reach",
          "subsection_content": "Local businesses benefit from increased visibility on the Go Drive platform. By being featured as a partner, they can reach a larger audience and attract more customers."
        },
        {
          "subheading": "Leveraging the User Base",
          "subsection_content": "These partnerships help businesses leverage the Go Drive user base to promote their products and services, fostering a mutually beneficial relationship."
        }
      ],
      "conclusion": "The partnerships between Go Drive and local businesses create a symbiotic relationship that benefits both parties. Riders gain access to exclusive deals, while businesses enjoy increased exposure and customer engagement."
    },
    "date": "15 Mar / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d59779567a2d4498c3edca"
    },
    "img": "https://i.ibb.co/pdTy9qF/auto4.jpg",
    "title": "Understanding Go Drive’s Rating System",
    "content": {
      "heading": "Tips for Getting a High Rating as a Driver",
      "subheadings": [
        {
          "subheading": "Best Practices to Follow",
          "subsection_content": "Maintaining a high rating as a driver involves providing excellent customer service, being punctual, and maintaining a clean and comfortable vehicle."
        },
        {
          "subheading": "Passenger Engagement",
          "subsection_content": "Engaging positively with passengers, offering assistance when needed, and ensuring a smooth ride experience are key factors that can influence ratings positively."
        }
      ],
      "heading2": "How Ratings Affect Your Ride Experience",
      "subheadings2": [
        {
          "subheading": "Impact on Drivers and Passengers",
          "subsection_content": "Ratings are crucial in the Go Drive ecosystem, influencing both ride preferences and earnings for drivers. High ratings can lead to more ride requests and potentially higher earnings."
        },
        {
          "subheading": "Enhanced Ride Experience",
          "subsection_content": "For passengers, a good rating means access to top-rated drivers, enhancing their overall ride experience."
        }
      ],
      "conclusion": "Understanding and maintaining a good rating system is essential for both drivers and passengers on Go Drive. It not only impacts earnings and ride quality but also fosters a community of trust and reliability."
    },
    "date": "28 Feb / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d597ad567a2d4498c3edcc"
    },
    "img": "https://i.ibb.co/6NnMQtm/car3.jpg",
    "title": "Go Drive for Business: Corporate Solutions",
    "content": {
      "heading": "Benefits of Using Go Drive for Work Travel",
      "subheadings": [
        {
          "subheading": "Efficiency and Cost-Effectiveness",
          "subsection_content": "Go Drive offers significant advantages for corporate travel, including reduced transportation costs, streamlined expense management, and increased convenience for employees."
        },
        {
          "subheading": "Flexible Billing and Reporting",
          "subsection_content": "Businesses can benefit from flexible billing options and detailed ride reports, making it easier to manage and audit travel expenses."
        }
      ],
      "heading2": "How to Set Up a Corporate Account",
      "subheadings2": [
        {
          "subheading": "A Step-by-Step Guide",
          "subsection_content": "Setting up a corporate account with Go Drive is straightforward. Businesses can sign up online, provide necessary details, and customize settings to suit their travel needs."
        },
        {
          "subheading": "Getting Started with Corporate Rates",
          "subsection_content": "Once the account is set up, employees can start booking rides for work-related travel, benefiting from the corporate rates and streamlined billing."
        }
      ],
      "conclusion": "Go Drive for Business provides tailored solutions that cater to corporate travel needs. From cost savings to easy management, it is an ideal choice for businesses looking to optimize their transportation strategies."
    },
    "date": "14 Feb / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d598c7567a2d4498c3edce"
    },
    "img": "https://i.ibb.co/TqCZRp1/car4.jpg",
    "title": "Exploring New Cities with Go Drive",
    "content": {
      "heading": "Top Destinations to Visit with Go Drive",
      "subheadings": [
        {
          "subheading": "Must-See Places",
          "subsection_content": "Go Drive offers services in numerous cities, providing visitors with easy access to top destinations. From cultural landmarks to popular eateries, there's always something new to explore."
        },
        {
          "subheading": "Local Discovery",
          "subsection_content": "Whether you're a tourist or a local looking to rediscover your city, Go Drive can help you navigate with ease and comfort."
        }
      ],
      "heading2": "Tips for Tourists Using Ride-Sharing Services",
      "subheadings2": [
        {
          "subheading": "Maximizing Your Experience",
          "subsection_content": "Tourists can benefit from understanding local ride-sharing etiquette, using in-app features to stay safe, and planning rides in advance during peak hours."
        },
        {
          "subheading": "Avoiding Unexpected Costs",
          "subsection_content": "It's also important to be aware of fare estimates and traffic conditions to avoid unexpected costs or delays."
        }
      ],
      "conclusion": "Using Go Drive to explore new cities offers a convenient and flexible way to see the sights. By following a few simple tips, tourists can enhance their travel experience and enjoy all that a city has to offer."
    },
    "date": "30 Jan / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d59945567a2d4498c3edd1"
    },
    "img": "https://i.ibb.co/hMBFDnP/bike4.jpg",
    "title": "Promotions and Discounts: Saving Money with Go Drive",
    "content": {
      "heading": "Current Promotions for New Users",
      "subheadings": [
        {
          "subheading": "Welcome Offers",
          "subsection_content": "New users of Go Drive can enjoy a variety of promotional offers, including discounted rides and referral bonuses. These promotions are designed to make the onboarding experience more attractive and rewarding."
        },
        {
          "subheading": "Staying Informed",
          "subsection_content": "Users are encouraged to check the app regularly for new promotions and updates to maximize their savings."
        }
      ],
      "heading2": "How to Find and Apply Discount Codes",
      "subheadings2": [
        {
          "subheading": "A Quick Guide",
          "subsection_content": "Applying discount codes on Go Drive is simple. Users can find codes through promotions on the app, partner websites, or special events. Once found, codes can be applied during the booking process to receive discounts."
        },
        {
          "subheading": "Understanding Terms and Conditions",
          "subsection_content": "It's important to read the terms and conditions of each promotion to ensure eligibility and understand the savings."
        }
      ],
      "conclusion": "Go Drive offers multiple ways for users to save on rides through various promotions and discounts. By staying informed and taking advantage of these offers, riders can enjoy more affordable travel."
    },
    "date": "8 Jan / Go Drive"
  },
  {
    "_id": {
      "$oid": "66d59a3a567a2d4498c3edd3"
    },
    "img": "https://i.ibb.co/pdTy9qF/auto4.jpg",
    "title": "The Future of Autonomous Vehicles and Go Drive",
    "content": {
      "heading": "Current Developments in Self-Driving Technology",
      "subheadings": [
        {
          "subheading": "The Road Ahead",
          "subsection_content": "Autonomous vehicles are rapidly advancing, with improvements in AI, sensor technology, and real-time data processing paving the way for safer and more reliable self-driving cars."
        },
        {
          "subheading": "Go Drive's Monitoring",
          "subsection_content": "Go Drive is closely monitoring these developments to stay at the forefront of technological innovation in the transportation sector."
        }
      ],
      "heading2": "How Go Drive is Preparing for Autonomous Rides",
      "subheadings2": [
        {
          "subheading": "Integration Plans and Future Goals",
          "subsection_content": "Go Drive is planning to integrate autonomous vehicles into its fleet, starting with pilot programs in select cities. This move aims to reduce costs, improve safety, and offer a new level of convenience to customers."
        },
        {
          "subheading": "Safety Protocols and Infrastructure",
          "subsection_content": "The company is also focusing on developing robust safety protocols and enhancing its technology infrastructure to support this transition."
        }
      ],
      "conclusion": "The future of transportation is poised to change dramatically with the advent of autonomous vehicles. Go Drive is committed to leading this change by integrating self-driving technology into its services, promising a safer and more efficient travel experience."
    },
    "date": "9 Jan / Go Drive"
  }
];
export default blogs;