
// Accordion.js

export default function Accordion(props) {
    return (
        <>

            <div className="border rounded-full mb-4">
                <button
                    className="w-full p-4 text-left
                            transition duration-300"
                    onClick={props.toggleAccordion}
                >
                    <span className={`float-right transform ${props.isOpen ?
                        'rotate-180' : 'rotate-0'} 
                                 transition-transform duration-300`}>
                        &#9660;
                    </span>
                    {props.title}

                </button>

            </div>

            {props.isOpen && (
                <div className="p-4 bg-white">
                    {props.data}
                </div>
            )}
        </>
    );
};