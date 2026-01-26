import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import "../styles/chatbot.css";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
        "Hi 👋 I’m your shopping assistant. Try: 'products below 500' or 'add phone'"
    }
  ]);
  const [products, setProducts] = useState([]);

  /* LOAD PRODUCTS */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products for chatbot");
    }
  };

  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.toLowerCase();
    addMessage("user", input);
    setInput("");

    /* SHOW ALL PRODUCTS */
    if (userText.includes("show products")) {
      const names = products.map(p => p.name).join(", ");
      addMessage(
        "bot",
        names
          ? `Available products: ${names}`
          : "No products available"
      );
      return;
    }

    /* PRODUCTS BELOW PRICE */
    if (userText.includes("below")) {
      const price = parseInt(userText.match(/\d+/));
      const filtered = products.filter(p => p.price <= price);

      addMessage(
        "bot",
        filtered.length
          ? `Products below ₹${price}: ${filtered
              .map(p => p.name)
              .join(", ")}`
          : "No products found in that range"
      );
      return;
    }

    /* SEARCH PRODUCT */
    if (userText.startsWith("search")) {
      const keyword = userText.replace("search", "").trim();
      const results = products.filter(p =>
        p.name.toLowerCase().includes(keyword)
      );

      addMessage(
        "bot",
        results.length
          ? `Found: ${results.map(p => p.name).join(", ")}`
          : "No matching products found"
      );
      return;
    }

    /* ADD TO CART (WITH STOCK CHECK) */
    if (userText.startsWith("add")) {
      const keyword = userText
        .replace("add", "")
        .replace("to cart", "")
        .trim();

      const product = products.find(p =>
        p.name.toLowerCase().includes(keyword)
      );

      if (!product) {
        addMessage("bot", "❌ Product not found");
        return;
      }

      // ✅ STOCK CHECK
      if (product.stock <= 0) {
        addMessage(
          "bot",
          `❌ ${product.name} is currently out of stock`
        );
        toast.error("Product is out of stock");
        return;
      }

      try {
        await api.post("/cart", {
          productId: product._id,
          quantity: 1
        });

        toast.success(`${product.name} added to cart 🛒`);
        addMessage(
          "bot",
          `✅ ${product.name} added to your cart`
        );
      } catch {
        addMessage("bot", "Failed to add product to cart");
      }

      return;
    }

    /* FALLBACK */
    addMessage(
      "bot",
      "🤖 I didn’t understand. Try: show products, add phone, products below 1000"
    );
  };

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {/* CHAT WINDOW */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            🛒 Shop Assistant
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chatbot-message ${m.from}`}
              >
                <span>{m.text}</span>
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me something..."
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
