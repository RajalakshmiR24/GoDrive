const Wallet = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div
        className="bg-gray-100 p-6 rounded-lg border border-gray-300 mb-6 w-full max-w-4xl h-52"
        style={{
          background:
            "linear-gradient(0deg, rgb(246, 246, 246), rgba(255, 255, 255, 0.5)), linear-gradient(315deg, rgb(255, 255, 255) 0%, rgb(203, 203, 203) 50%, rgb(238, 238, 238) 50%, rgb(246, 246, 246) 100%)",
        }}
      >
        <h2 className="text-gray-600 text-xl font-semibold mb-2">Uber Cash</h2>
        <p className="text-2xl font-bold mb-4">₹0.00</p>
        <button className="bg-black text-white mt-8 py-3 px-4 rounded-full hover:bg-gray-800">
          + Gift card
        </button>
      </div>

      <div className="w-full max-w-4xl mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment Methods</h3>
        <div className="bg-green-700 text-white p-4 rounded-lg flex flex-col sm:flex-row justify-between mb-4 w-full sm:w-5/12 h-52">
          <div className="flex flex-col sm:flex-row gap-1 h-8 w-full sm:w-3/4">
            <span className="text-lg">Cash</span>
            <span className="bg-gray-300 text-black px-2 h-6 self-center rounded-md">
              Preferred
            </span>
          </div>
          <div className="flex justify-end sm:justify-start">
            <span className="text-white text-lg">
              <svg
                fill="#c8eed4"
                width="36px"
                height="36px"
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title></title>
                  <g>
                    <path d="M90,12H6a5.9966,5.9966,0,0,0-6,6V78a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V18A5.9966,5.9966,0,0,0,90,12ZM24,72A12.0119,12.0119,0,0,0,12,60V36A12.0119,12.0119,0,0,0,24,24H72A12.0119,12.0119,0,0,0,84,36V60A12.0119,12.0119,0,0,0,72,72Z"></path>
                    <path d="M48,36A12,12,0,1,0,60,48,12.0119,12.0119,0,0,0,48,36Z"></path>
                  </g>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <button className="text-gray-800 bg-transparent border-none cursor-pointer font-medium">
          + Add Payment Method
        </button>
      </div>

      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-2">Vouchers</h3>
        <button className="text-gray-800 bg-transparent border-none cursor-pointer font-medium">
          + Add voucher
        </button>
      </div>
    </div>
  );
};

export default Wallet;