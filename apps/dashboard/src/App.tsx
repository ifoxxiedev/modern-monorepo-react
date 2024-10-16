import { Button } from "@monorepo/ui";

function App() {
  return (
    <>
      <Button onClick={() => console.log("HELLO")}>Content</Button>
      <button className="text-white p-2 bg-red-500 ">Click me</button>
    </>
  );
}

export default App;
