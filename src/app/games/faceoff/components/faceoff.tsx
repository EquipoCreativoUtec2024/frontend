"use client";

import React, {useState, useEffect} from "react";
import Image from "next/image";
// import faceoffLogo from "./faceoff_logo.png"; 
import faceoffLogo from "./logito.png";
import { useRouter } from "next/navigation";

export default function Faceoff() {
    const router = useRouter();
    const [showImage, setShowImage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowImage(false);
        }, 3000); // 3 segundos

        return () => clearTimeout(timer); // Limpiar el temporizador cuando el componente se desmonte
    }, []);

    const handleButtonClick = () => {
        router.push("/games/faceoff/faceoffjuego");
      };

    return (
        <div style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '75vh', 
            flexDirection: 'column',
            overflow: 'hidden' 
        }}>
            {showImage ? (
                <Image
                    src={faceoffLogo}
                    width={250}
                    alt="faceoff"
                    priority
                />
            ) : (
                <>
                    <div style={{ 
                    backgroundColor: '#2D0AFF', 
                    color: 'white', 
                    padding: '35px', 
                    borderRadius: '20px', 
                    marginBottom: '30px', 
                    fontSize: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'justify',
                    fontFamily: 'Verdana',
                    width: '240px',
                }}>
                    <div>
                    En este juego, cada ronda empieza con un color misterioso. La pantalla se ilumina con destellos de diferentes colores, ¡y tu misión es tocar justo cuando brille el color correcto!
                    </div>
                    <div style={{ marginBottom: '40px' }}>
                        {}
                    </div>
                    <button
                    onClick={handleButtonClick}
                    style={{ 
                        marginTop: '10px',
                        padding: '10px 20px', 
                        fontSize: '16px', 
                        backgroundColor: 'white', 
                        color: 'black', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
                        
                    }}
                    >
                        OK! Jugar
                    </button>
                </div>
                </>
            )}
        </div>
    );
}

/* <button style={{ marginTop: '5px', 
                padding: '10px 18px', 
                fontSize: '16px', 
                cursor: 'pointer',
                backgroundColor: '#2D0AFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontFamily: 'Rubik, sans-serif',
                 }}>
                Jugar
            </button> */
