import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const useScrollAnimation = () => {
    const [ref, inView] = useInView({
        threshold: 0.2,
    });

    const animation = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return [ref, inView ? animation.visible : animation.hidden];
};