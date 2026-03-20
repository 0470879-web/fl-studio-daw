// audio-engine.js

// Web Audio API Implementation for Synthesizers, Drum Machines, and Audio Effects

class AudioEngine {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.synthesizer = this.audioContext.createOscillator();
        this.synthesizer.type = 'sine';
        this.synthesizer.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4 note

        // Create effects
        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime); // Set initial gain
        this.synthesizer.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
    }

    startSynth(frequency) {
        this.synthesizer.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        this.synthesizer.start();
    }

    stopSynth() {
        this.synthesizer.stop();
    }

    setGain(value) {
        this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
    }

    createDrumMachine() {
        // Simple drum machine implementation
        const kick = this.audioContext.createOscillator();
        kick.type = 'sine';
        kick.frequency.setValueAtTime(150, this.audioContext.currentTime); // Kick frequency
        kick.connect(this.gainNode);

        const playKick = () => {
            kick.start();
            kick.stop(this.audioContext.currentTime + 0.1); // Short kic through play
        };

        return playKick;
    }

    applyReverb() {
        // Basic reverb effect
        const convolver = this.audioContext.createConvolver();
        // Load impulse response here
        this.gainNode.connect(convolver);
        convolver.connect(this.audioContext.destination);
    }
}

// Example usage
const audioEngine = new AudioEngine();

// Start a synthesizer tone
audioEngine.startSynth(440); // A4

audioEngine.setGain(0.5); // Set volume

// Create and play a kick drum sound
const playKick = audioEngine.createDrumMachine();
playKick();

// Optionally apply reverb (not yet implemented here)
