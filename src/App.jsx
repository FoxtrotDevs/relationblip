
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import BlipModal from "./components/BlipModal";
import "./index.css";
import pixelHeart from "./assets/pixel-heart.png";

function App() {
  const [blips, setBlips] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBlips = async () => {
      const { data, error } = await supabase
        .from("blips")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Supabase fetch error:", error);
      } else {
        setBlips(data);
      }
    };

    fetchBlips();
  }, []);

  const handleBlipSubmit = (blip) => {
    setBlips([blip, ...blips]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen text-white p-4 flex flex-col items-center">
      <div className="banner-wrapper w-full max-w-4xl mx-auto text-center">
        <pre className="text-[10px] sm:text-xs md:text-sm lg:text-base font-mono glitchy-banner leading-tight whitespace-pre-wrap select-none tracking-tight">
{`
 #####  ###### #        ##   ##### #  ####  #    # #####  #      # #####      
 #    # #      #       #  #    #   # #    # ##   # #    # #      # #    #     
 #    # #####  #      #    #   #   # #    # # #  # #####  #      # #    #     
 #####  #      #      ######   #   # #    # #  # # #    # #      # #####  ### 
 #   #  #      #      #    #   #   # #    # #   ## #    # #      # #      ### 
 #    # ###### ###### #    #   #   #  ####  #    # #####  ###### # #      ### 
`}
        </pre>

        <img src={pixelHeart} alt="Broken pixel heart logo" className="pixel-heart-glitch" />
        <p className="tagline text-pink-400 text-sm mt-2 tracking-widest font-mono">
          Sarcasm. Truth. Something Else.
        </p>
      </div>

<button onClick={() => setShowModal(true)} className="share-blip-button">
  💔 Share a Blip
</button>



      <BlipModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleBlipSubmit}
      />

      <div className="mt-10 w-full max-w-2xl space-y-6">
        {blips.length === 0 ? (
          <p className="text-gray-400 text-center italic">No blips yet. Start the weirdness.</p>
        ) : (
          blips.map((blip, i) => (
            <div
              key={blip.id || i}
              className="blip-card bg-[#111827] p-4 rounded-lg shadow-md border border-cyan-800"
            >
              {blip.title && (
                <h2 className="text-xl font-bold text-pink-300 drop-shadow-sm mb-1">
                  {blip.title}
                </h2>
              )}
              <p className="text-cyan-100 whitespace-pre-line">{blip.story}</p>
              <p className="mt-2 text-xs text-gray-400 italic">
                Posted: {new Date(blip.created_at).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
