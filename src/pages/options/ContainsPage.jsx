const ContainsPage = () => {
  const handleTest = (e) => {
    e.preventDefault();
    // Add logic to validate if the DFA's string contains a given substring.
    alert("Contains test logic goes here!");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Test: Contains</h1>
      <form onSubmit={handleTest}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="inputString">
            Enter your string:
          </label>
          <input
            id="inputString"
            type="text"
            placeholder="e.g., hello world"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="containsText">
            Should contain:
          </label>
          <input
            id="containsText"
            type="text"
            placeholder="e.g., lo wo"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test
        </button>
      </form>
    </div>
  );
};

export default ContainsPage;
