import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './About.module.css';

const About = () => {
  const values = [
    {
      icon: '🌱',
      title: 'Organic First',
      description: 'We use only certified organic cotton and natural materials. No harsh chemicals, no synthetic dyes – just pure comfort for sensitive baby skin.'
    },
    {
      icon: '🇮🇳',
      title: 'Made in India',
      description: 'Every piece is lovingly crafted by skilled artisans across India. We support local communities and preserve traditional craftsmanship.'
    },
    {
      icon: '♻️',
      title: 'Sustainable',
      description: 'From eco-friendly packaging to minimal waste production, we’re committed to leaving a better world for the little ones we dress.'
    }
  ];

  const qualityPoints = [
    '100% Organic Certified Cotton',
    'Nickel-free Snaps & Buttons',
    'AZO-free Natural Dyes',
    'Pre-Washed for Softness',
    'Tested for Skin Safety',
    'Reinforced Seams'
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Born from a mother’s love, Oh Baby! was created to dress your little ones in comfort and style.
          </motion.p>
        </div>
      </section>

      {/* Story Content */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.storyImage}
            >
              <img src="/images/about-hero.jpg" alt="Our Founders" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.storyText}
            >
              <h2>How It All Began</h2>
              <p>
                Oh Baby! started as a passion project in 2020, when our founder, a new mother, struggled to find soft, safe, and stylish clothing for her newborn. Every fabric felt too rough, every design too generic.
              </p>
              <p>
                What began as making clothes for her own baby soon became requests from friends and family. Word spread through WhatsApp groups and Instagram, and before we knew it, Oh Baby! was born.
              </p>
              <p>
                Today, we’re proud to be a trusted choice for thousands of parents across India, offering organic, sustainable clothing that’s as gentle on your baby as your own touch.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What We Stand For</h2>
          <div className={styles.valuesGrid}>
            {values.map((v, idx) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.valueCard}
              >
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className={styles.qualitySection}>
        <div className="container">
          <div className={styles.qualityCard}>
            <h2>Our Quality Promise</h2>
            <div className={styles.qualityGrid}>
              {qualityPoints.map((point, idx) => (
                <div key={idx} className={styles.qualityItem}>
                  <span className={styles.check}>✓</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2>Ready to Experience the Difference?</h2>
            <p>Join thousands of happy parents who trust Oh Baby! for their baby’s wardrobe.</p>
            <Link to="/shop">
              <Button size="lg" variant="primary" className={styles.ctaBtn}>
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
