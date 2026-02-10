"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LoveConfetti from "./components/Confetti";

export const metaData = {
    title: "Cherry Blossom"
}

/* ================= CONFIG ================= */
const PASSWORD = "525232"; // change to anything (e.g. her name or date)

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


const timeline = [
    { date: "First day we met", text: "I knew you were special instantly." },
    { date: "Our first date", text: "I couldn’t stop smiling the whole night." },
    { date: "Today", text: "Still choosing you every single day ❤️" },
];

const images = [
    "/cherry-1.jpg",
    "/cherry-6.JPG",
    "/cherry-8.JPG",
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

    /* Fire Confetti */
    const fireConfetti = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowConfetti(true);
    };

    const handleUnlock = () => {
        if (input === PASSWORD) {
            setUnlocked(true);
        } else {
            // cycle through romantic hints
            const nextIndex = (errorIndex + 1) % romanticHints.length;
            setErrorIndex(nextIndex);
            setErrorMessage(romanticHints[nextIndex]);
            setInput(""); // clear input
        }
    };

    /* PASSWORD SCREEN */
    if (!unlocked) {
        return (
            <div className="h-screen flex items-center justify-center bg-linear-to-br from-black via-purple-900 to-pink-900 text-white">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold">For Your Eyes Only ❤️</h1>
                    <div>

                        <input
                            type="password"
                            placeholder="Enter our secret"
                            className="px-4 py-2 rounded-md text-gray-200 border w-85 border-gray-400"
                            value={input}
                            onChange={(e) => {
                                setErrorMessage("")
                                setInput(e.target.value)
                            }
                            }
                        />

                        {errorMessage && (
                            <p className="text-red-400 mt-1 text-sm starting:opacity-0 opacity-100 duration-200 ease-linear">{errorMessage}</p>
                        )}
                    </div>

                    <button
                        className="block mx-auto bg-pink-500 px-6 py-2 rounded"
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
        <main className="min-h-screen overflow-visible text-white bg-linear-to-br from-black via-purple-900 to-pink-900 p-8 space-y-10">
            {/* Confetti */}
            <LoveConfetti showConfetti={showConfetti} />


            {/* HERO */}
            <section className="text-center space-y-2">
                <h1 className="text-6xl font-bold">For You ❤️</h1>
                <p className="opacity-70">Something I built just for us</p>
            </section>

            {/* LETTER */}
            <section className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl mb-4">A Note From Me</h2>
                <p className="leading-7 text-lg">{typedText}|</p>
            </section>

            {/* SLIDESHOW */}
            <section className="text-center">
                <h2 className="text-2xl mb-6">Our Moments</h2>
                <div className="relative  w-125 h-125 mx-auto rounded-xl shadow-2xl">
                    {images.map((img, i) => (
                        <Image
                            alt={`moment-${i}`}
                            fill

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
                <button
                    onClick={fireConfetti}
                    className="bg-purple-600 px-6 py-3 rounded"
                >
                    Celebrate Us 🎉
                </button>
            </section>

            <footer className="text-center opacity-50 pt-10">
                Made with ❤️ by BooThang
            </footer>
        </main>
    );
}
