"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LoveConfetti from "./components/Confetti";



/* ================= CONFIG ================= */
const PASSWORD = "2022-12-17";


const romanticHints = [
    "Oops… the number isn’t right, but think of the day that marks my love for you'. ❤️",
    "Hmm… not quite… maybe something special happened on this date? 💌",
    "Almost! This number holds a memory of us… special memory? 🌸",
    "Try again… it’s a date that changed my life forever, just like you did. 💖",
    "Not yet… our love is in the details, think of a date we celebrate every year! 💕"
];

const reasons = [
    "Your smile melts my heart every single time, and it reminds me how lucky I am to have you in my life.",
    "You believe in me even when I doubt myself, and that unwavering support gives me strength every day.",
    "Being with you makes me feel completely safe, like no matter what happens, we can face it together.",
    "You’re not just my love, but my best friend, my confidant, and my favorite person to laugh with.",
    "Everything is better with you—every moment, every adventure, every quiet evening, simply because you’re by my side.",
    "The way you care for me and others inspires me to be a better person, and I cherish that about you endlessly.",
    "Your laughter is contagious, your kindness limitless, and your heart is the most beautiful part of this world.",
    "Every day with you is a new memory I treasure, and I can’t imagine a life without your love and warmth.",
    "You make ordinary moments magical, turning the simplest things into memories I’ll hold forever.",
    "Your presence fills my life with joy, love, and meaning, and I am forever grateful for you."
];



/* ========================================== */

export default function LovePage() {
    const [unlocked, setUnlocked] = useState(false);
    const [input, setInput] = useState("");
    const [errorIndex, setErrorIndex] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [typedText, setTypedText] = useState("");
    const [reasonIndex, setReasonIndex] = useState(0);
    const [slide, setSlide] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);


    const letter =
        "From the moment you walked into my life, everything changed. I built this little space just for you, because you deserve something made with intention. I love you deeply, today and always.";

    /* Typewriter Effect */
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(letter.slice(0, i));
            i++;
            if (i > letter.length) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
    }, []);

    /* Slideshow */
    useEffect(() => {
        const interval = setInterval(() => {
            setSlide((s) => (s + 1) % images.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    const fireConfetti = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowConfetti(true);

        if (audioRef.current) {
            audioRef.current.volume = 0;
            audioRef.current.play().catch((err) => console.log(err));

            let vol = 0;
            const fade = setInterval(() => {
                if (audioRef.current && vol < 1) {
                    vol = Math.min(vol + 0.05, 1); // ensure it never exceeds 1
                    audioRef.current.volume = vol;
                } else {
                    clearInterval(fade);
                }
            }, 100);
        }


    };


    const handleUnlock = () => {
        if (input === PASSWORD) {
            setUnlocked(true);
        } else {
            const nextIndex = (errorIndex + 1) % romanticHints.length;
            setErrorIndex(nextIndex);
            setErrorMessage(romanticHints[nextIndex]);
            setInput("");
        }
    };


    /* PASSWORD SCREEN */
    if (!unlocked) {
        return (
            <div className="relative h-screen flex items-center justify-center text-white">

                {/* Background Image */}
                <div className="absolute inset-0 bg-[url(/IMG_0184.JPG)] bg-no-repeat bg-center bg-contain"></div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-4">
                    <h1 className="text-3xl font-bold">My Cherry Blossom ❤️</h1>

                    <div>
                        <div className="relative w-full md:w-85">
                            <input
                                type="date"
                                className="px-4 py-2 pr-10 rounded-md text-white border border-gray-400 bg-black/10 w-full accent-white"
                                value={input}
                                onChange={(e) => {
                                    setErrorMessage("");
                                    setInput(e.target.value);
                                }}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none">
                                📅
                            </span>
                        </div>


                        {errorMessage && (
                            <p className="text-red-200 mt-1 text-base transition-opacity duration-200 ease-linear">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                    <button
                        disabled={!input}
                        className="block mx-auto bg-pink-500 px-6 py-2 rounded hover:bg-pink-600 transition disabled:opacity-50"
                        onClick={handleUnlock}
                    >
                        Unlock
                    </button>

                </div>
            </div>

        );
    }

    /* MAIN PAGE */
    return (
        <main className="min-h-screen overflow-visible text-white bg-linear-to-br from-black via-purple-900 to-pink-900 p-4 md:p-8 space-y-10">
            {/* Confetti */}
            <LoveConfetti showConfetti={showConfetti} />


            {/* HERO */}
            <section className="text-center space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold">For You ❤️</h1>
                <p className="opacity-70">Something I built just for us</p>
            </section>

            {/* LETTER */}
            <section className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl mb-2">A Note From Me</h2>
                <p className="leading-7 text-gray-200 md:text-lg">{typedText}|</p>
            </section>

            {/* SLIDESHOW */}
            <section className="text-center">
                <h2 className="text-2xl mb-6">Our Moments</h2>
                <div className="relative shrink md:w-125 h-125 mx-auto rounded-xl shadow-2xl">
                    {images.map((img, i) => (
                        <Image
                            alt={`moment-${i}`}
                            height={600}
                            width={600}
                            key={i}
                            src={img}
                            className={`absolute w-full h-full object-cover rounded-xl transition-opacity duration-1000 ${slide === i ? "opacity-100" : "opacity-0"}`}
                        />
                    ))}
                </div>
            </section>

            {/* REASONS */}

            <section className="text-center space-y-4">
                <h2 className="text-2xl">Reasons I Love You</h2>
                <button
                    onClick={() => {
                        const nextIndex = (reasonIndex + 1) % reasons.length;
                        setReasonIndex(nextIndex);

                        // Speak the reason aloud
                        const utterance = new SpeechSynthesisUtterance(reasons[nextIndex]);
                        utterance.rate = 0.7; // speed
                        utterance.pitch = 1.2; // pitch a bit higher for warmth

                        window.speechSynthesis.speak(utterance);
                    }}
                    className="bg-pink-500 px-6 py-3 rounded animate-bounce"
                >
                    Click me {reasonIndex > 0 ? "Again" : ""}
                </button>
                <p className="text-lg font-semibold">{reasons[reasonIndex]}</p>
            </section>


            {/* CELEBRATE BUTTON */}
            <section className="text-center">
                <audio
                    ref={audioRef}
                    src="/Marc_Anthoni_-_I_NEED_YOU_(mp3.pm).mp3"
                    preload="auto"
                /> 
                <button
                    onClick={fireConfetti}
                    className="bg-purple-600 px-6 py-3 rounded animate-pulse"
                >
                    Click 2 celebrate Us 🎉
                </button>
            </section>

            <footer className="text-center opacity-50 pt-10">
                Made with ❤️ by BooThang
            </footer>
        </main>
    );
}





const images = [
    "/cherry-1.jpg",
    "/cherry-6.JPG",
    "/cherry-8.JPG",
    "/20251115_124854.jpg",
    "/20251115_125255.jpg",
    "/60194921-0B8F-417F-8A08-E0DEC657EC27.JPG",
    "/IMG_0184.JPG",
    "/IMG_20220128_155528_729.jpg",
    "/IMG_8587.JPG",
    "/IMG_8584.JPG",
    "/IMG_5824.jpg",
    "/IMG_5819.jpg",
    "/IMG_5818.jpg",
    "/IMG_5813.jpg",
    "/IMG_5713.jpg",
    "/IMG_5708.jpg",
    "/IMG_5603.jpg",
    "/IMG_5602.jpg",
    "/IMG_5573.jpg",
    "/IMG_5410.jpg",
    "/IMG_4334.PNG",
    "/IMG_3330.webp",
    "/IMG_3257.jpg",
    "/IMG_2999.jpg",
    "/IMG_1967.jpg",
    "/IMG_1915.JPG",
    "/IMG_1903.jpg",
    "/IMG_1863.jpg",
    "/IMG_1846.jpg",
    "/IMG_1692.jpeg",
    "/IMG_1633.jpeg",
    "/IMG_1620.jpeg",
    "/IMG_0586.jpg",
    "/IMG_0570.jpg",
    "/IMG_0527.jpg",
    "/IMG_0502.JPG",
    "/IMG_0418.JPG"




];