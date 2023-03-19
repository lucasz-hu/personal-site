import CommandLine from "./CommandLine";

function App() {
    return (
        <div className="App min-h-screen bg-[#232627] flex flex-col justify-start items-start">
            <header className="w-full mt-2 text-white">
                <pre
                    style={{ whiteSpace: "pre-wrap" }}
                    className="text-[8px] md:text-[14px] flex justify-start items-start text-shadow-lg shadow-blue-400 text-blue-400"
                >{`                                    
                #      #    #  ####    ##    ####     ###### #    # #    # 
                #      #    # #    #  #  #  #             #  #    # #    # 
                #      #    # #      #    #  ####        #   ###### #    # 
                #      #    # #      ######      #      #    #    # #    # 
                #      #    # #    # #    # #    #     #     #    # #    # 
                ######  ####   ####  #    #  ####     ###### #    #  ####`}</pre>
            </header>
            <CommandLine />
        </div>
    );
}

export default App;
