import { useEffect, useRef } from "react";

export default function Header() {
    const alertRef = useRef();

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape" && alertRef.current) {
                alertRef.current.classList.remove("show");
                alertRef.current.classList.add("d-none");
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div
            ref={alertRef}
             className="alert background-black alert-dismissible fade show text-center mb-0 rounded-0 py-1"
            role="alert">
            <span className="text-white small">
                Sign up and get 20% off your first order.{' '}
                <a href="#" className="alert-link text-white text-decoration-none">Sign Up Now</a>
            </span>

            {/* Close button */}
            <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
}
