import React, { useState, useRef } from 'react';
import { Camera, ShoppingCart, Menu, X, AlertTriangle, Check, ChevronDown, MessageSquare, Plus } from 'lucide-react';

const partsDatabase = [
  { 
    id: 1, 
    name: "Water Pump (طرمبة ماء)", 
    related: [
      { name: "Timing Belt (سير تايمن)", price: "280 SAR" },
      { name: "Coolant (ماء رديتر)", price: "45 SAR" }
    ], 
    price: "350 SAR",
    tip: "يوصى بتغيير سير التايمن عند تغيير طرمبة الماء لتوفير تكاليف العمالة"
  },
  { 
    id: 2, 
    name: "Brake Pads (فحمات فرامل)", 
    related: [
      { name: "Brake Discs (هوبات)", price: "420 SAR" },
      { name: "Brake Fluid (زيت فرامل)", price: "35 SAR" }
    ],
    price: "120 SAR",
    tip: "فحص الهوبات عند تغيير الفحمات يضمن أداء فرامل مثالي"
  },
  { 
    id: 3, 
    name: "Alternator (دينمو)", 
    related: [
      { name: "Battery (بطارية)", price: "380 SAR" },
      { name: "Belt (سير ماكينة)", price: "90 SAR" }
    ],
    price: "600 SAR",
    tip: "فحص البطارية عند تغيير الدينمو يضمن نظام شحن كامل الكفاءة"
  }
];

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleScanClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePartSelect = (part) => {
    setSelectedPart(part);
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const addAllRelatedToCart = () => {
    if (selectedPart) {
      const newItems = [
        { name: selectedPart.name, price: selectedPart.price },
        ...selectedPart.related
      ];
      setCartItems([...cartItems, ...newItems]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const sendWhatsAppOrder = () => {
    const orderText = `طلب قطع غيار من عين الصقر:\n\n${cartItems.map(item => `- ${item.name}: ${item.price}`).join('\n')}\n\nالمجموع: ${calculateTotal()} SAR`;
    const encodedText = encodeURIComponent(orderText);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-slate-800 py-4 px-6 border-b border-orange-500 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-orange-500">عين الصقر</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <button className="p-2 rounded-full hover:bg-slate-700 relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -left-1 bg-orange-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-slate-700"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700 py-4 px-6">
          <div className="flex flex-col space-y-4">
            <button className="flex items-center space-x-2 space-x-reverse">
              <ShoppingCart className="w-5 h-5" />
              <span>سلة المشتريات ({cartItems.length})</span>
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Home Screen */}
        {!selectedImage && (
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-8">مساعدك الذكي لقطع غيار السيارات</h2>
            
            {/* Scan Button */}
            <div className="mb-12">
              <button
                onClick={handleScanClick}
                className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-6 px-12 rounded-full text-xl flex items-center mx-auto transition-colors shadow-lg shadow-orange-500/20"
              >
                <Camera className="ml-2 w-8 h-8" />
                مسح قطعة الغيار
              </button>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </div>
            
            {/* Manual Search */}
            <div className="max-w-md mx-auto">
              <h3 className="text-lg mb-4">أو ابحث يدوياً</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن قطعة غيار..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute left-3 top-3 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Analysis Screen */}
        {selectedImage && !selectedPart && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">نتيجة المسح</h2>
              <button 
                className="text-orange-500 hover:text-orange-400"
                onClick={() => setSelectedImage(null)}
              >
                إلغاء
              </button>
            </div>
            
            {/* Image Preview */}
            <div className="bg-slate-800 rounded-xl p-4 mb-8">
              <img 
                src={selectedImage} 
                alt="Scanned part" 
                className="w-full h-auto rounded-lg border border-slate-700"
              />
            </div>
            
            {/* Part Selection */}
            <div className="mb-8">
              <label className="block text-lg font-medium mb-2">اختر القطعة الممسوحة</label>
              <div className="relative">
                <select
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 pr-12 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => handlePartSelect(partsDatabase.find(p => p.id === parseInt(e.target.value)))}
                >
                  <option value="">-- اختر من القائمة --</option>
                  {partsDatabase.map(part => (
                    <option key={part.id} value={part.id}>{part.name} - {part.price}</option>
                  ))}
                </select>
                <div className="absolute left-3 top-3 pointer-events-none text-slate-400">
                  <ChevronDown className="w-6 h-6" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Smart Mechanic Logic */}
        {selectedPart && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">نصائح الصيانة الذكية</h2>
              <button 
                className="text-orange-500 hover:text-orange-400"
                onClick={() => setSelectedPart(null)}
              >
                رجوع
              </button>
            </div>
            
            {/* Part Card */}
            <div className="bg-slate-800 rounded-xl p-6 mb-6 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold mb-2">{selectedPart.name}</h3>
              <p className="text-orange-500 font-medium mb-4">{selectedPart.price}</p>
              
              <div className="flex items-start space-x-2 space-x-reverse bg-slate-700 p-4 rounded-lg mb-4">
                <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0 text-orange-500" />
                <p>{selectedPart.tip}</p>
              </div>
              
              <button
                onClick={() => addToCart({ name: selectedPart.name, price: selectedPart.price })}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-4 rounded-lg mb-4 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 ml-2" />
                إضافة {selectedPart.name} إلى السلة
              </button>
            </div>
            
            {/* Related Parts */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">القطع المرتبطة</h3>
              
              <div className="space-y-3 mb-6">
                {selectedPart.related.map((part, index) => (
                  <div key={index} className="bg-slate-800 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{part.name}</p>
                      <p className="text-orange-500 text-sm">{part.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(part)}
                      className="bg-slate-700 hover:bg-slate-600 text-orange-500 p-2 rounded-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={addAllRelatedToCart}
                className="w-full bg-slate-800 hover:bg-slate-700 text-orange-500 font-bold py-3 px-4 rounded-lg border border-orange-500 flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                إضافة الكل إلى السلة
              </button>
            </div>
          </section>
        )}

        {/* Cart Preview */}
        {cartItems.length > 0 && (
          <section className="bg-slate-800 rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <ShoppingCart className="w-6 h-6 ml-2" />
              سلة المشتريات
            </h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-orange-500 text-sm">{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-400 p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-700 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold">المجموع:</span>
                <span className="text-orange-500 font-bold">{calculateTotal()} SAR</span>
              </div>
            </div>
            
            <button
              onClick={sendWhatsAppOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5 ml-2" />
              إرسال الطلب عبر واتساب
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;