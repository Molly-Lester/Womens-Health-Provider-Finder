export default function CategoryCards({ category, setCategory }) {
    const categories = [
        {
            name: "General Women's Health",
            description: "GP services, routine check-ups and general concerns"
        },

        {
            name: "Family Planning",
            description: " "
        },

        { 
            name: "Sexual Health",
            description: " "
        },

        {
            name: "Fertility Services",
            description: " "
        },

        {
            name: "Pregnancy and Maternity",
            description: " "
        },

        {
            name: "Menopause Support",
            description: " "
        },
    ];

    return (
        <div>
            <h3>What brings you here today?</h3>

            <div className="category-grid">
                {categories.map((cat) => (
                    <div
                    key={cat.name}
                    className= "category-card"
                    onClick={() => setCategory(cat.name)}
                    
                    >

                    <h4>{cat.name}</h4>
                    <p>{cat.description}</p> 
                    </div>
                ))}
            </div>
        </div>
    );
}
