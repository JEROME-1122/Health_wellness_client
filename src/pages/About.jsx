import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="font-sans">

      <section className="pt-24 pb-16 bg-white text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4 text-green-600"
        >
          Transforming Wellness
        </motion.h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600">
          We build a digital platform that unites fitness, nutrition, and mental wellness into one seamless experience.
        </p>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-600">Our Vision</h2>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg">
          To create a healthier world by enabling individuals to track their well-being holistically, with smart tools and personalized insights.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { title: 'Integrated Wellness', desc: 'Bringing fitness, diet, and mental care together.' },
            { title: 'Data-Driven Insights', desc: 'Real-time analytics to track your health journey.' },
            { title: 'Community Support', desc: 'Join a supportive community of wellness enthusiasts.' }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 bg-gray-50 rounded-3xl shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-2 text-green-600">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-blue-500 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h2>
        <p className="text-lg mb-6">Sign up and take the first step towards a healthier, happier you.</p>
        <a href="/register" className="inline-block px-6 py-3 bg-white text-green-600 font-semibold rounded-full shadow hover:shadow-lg hover:bg-gray-100">Get Started</a>
      </section>
    </div>
  );
};

export default About;
