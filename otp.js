import { useState, useCallback } from 'react';
import { OtpInput } from './otpInput';
import './App.css'; // Import your custom CSS file

export function App() {
    const [otp, setOtp] = useState('');
    console.log("otp: ", otp);
    const otpLength = 6; // You can set the OTP length here

    const handleOtpPaste = useCallback(
        (e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text/plain').slice(0, otpLength);
            console.log(pastedText,"pastedText");
            const updatedOtp = pastedText.split('').map((char) => (/[^0-9]/.test(char) ? '' : char)); //CHECK FOR NUMBER
            setOtp(updatedOtp.join(''));
        },
        [otpLength]
    );


    const handleOtpChange = useCallback(
        (e, index) => {
            const value = e.target.value;

            if (/[^0-9]/.test(value)) return;

            let newOtp = otp.substr(0, index) + value + otp.substr(index + 1);
            console.log("newOtp: ", newOtp);

            // Ensure that the OTP does not exceed the desired length (6 digits)
            if (newOtp.length <= otpLength) {
                setOtp(newOtp);

                if (index < otpLength - 1 && value !== '') {
                    const nextInput = document.getElementById(`otp-input-${index + 1}`);
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
                
            }
            else {
                console.log("otp length is mismatch");
            }
            
        },
        [otp, otpLength]
    );


    const handleOtpKeyDown = useCallback(
        (e, index) => {
            if (e.keyCode === 8 && index >= 0) {
                e.preventDefault(); // Prevent the browser's default Backspace behavior
                let newOtp = otp.substring(0, index) + otp.substring(index + 1);
                setOtp(newOtp);

                if (index > 0) {
                    const prevInput = document.getElementById(`otp-input-${index - 1}`);
                    if (prevInput) {
                        prevInput.focus();
                    }
                }
            }
        },
        [otp]
    );

  

    return (
        <div className="App">
            <h1>OTP Input Example</h1>
            <div className="otp-input-container">
                {Array.from({ length: otpLength }).map((_, index) => (
                    <OtpInput
                        type="text"
                        min="1"
                        key={index}
                        value={otp[index] || ''}
                        onPaste={handleOtpPaste}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        id={`otp-input-${index}`}
                    />
                ))}
            </div>
            <p>Entered OTP: {otp}</p>
        </div>
    );
}
    
