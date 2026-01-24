

export default function SubmitButton({children, onClick}){

    const onButtonClick = (e) => {
        e.preventDefault();
        onClick();
    }
    return (
        <button onClick={(e) => onButtonClick(e)} className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-bold tracking-widest text-white shadow-[0_0_20px_rgba(99,102,241,0.6)] active:scale-95 transition">
            {children}
        </button>
    );

}