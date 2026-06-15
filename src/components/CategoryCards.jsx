import { Text, Paper, SimpleGrid } from '@mantine/core';

export default function CategoryCards({ category, setCategory }) {
    const categories = [
        { name: "General Women's Health", description: "GP services, routine check-ups, and general health concerns" },
        { name: "Family Planning & Contraception", description: "Support with contraception, pregnancy planning, and reproductive choices" },
        { name: "Sexual Health", description: "Testing, treatment, and advice for sexual health and wellbeing" },
        { name: "Fertility Support", description: "Help with fertility concerns, testing, and treatment options" },
        { name: "Pregnancy & Maternity Care", description: "Support during pregnancy, antenatal care, and postnatal services" },
        { name: "Menopause Support", description: "Advice and treatment for menopause symptoms and hormonal changes" },
    ];

    return (
        <Paper
            withBorder
            radius="md"
            p="lg"
            style={{
                margin: "0 24px",
                backgroundColor: "#fff",
            }}
        >
            <Text c="dimmed" mb="sm" size="md" ta="left">
                What brings you here today?
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {categories.map((cat) => (
                    <Paper
                        key={cat.name}
                        withBorder
                        p="md"
                        radius="md"
                        onClick={() => setCategory(cat.name)}
                        style={{
                            cursor: 'pointer',
                            borderColor: category === cat.name ? '#7c3aed' : '#e9ecef',
                            backgroundColor: category === cat.name ? '#f5f3ff' : 'white',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (category !== cat.name) {
                                e.currentTarget.style.backgroundColor = '#fafafa';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (category !== cat.name) {
                                e.currentTarget.style.backgroundColor = 'white';
                            }
                        }}
                    >
                        <Text fw={500} size="sm" ta="left">{cat.name}</Text>
                        <Text size="xs" c="dimmed" mt={5} ta="left">
                            {cat.description}
                        </Text>
                    </Paper>
                ))}
            </SimpleGrid>
        </Paper>
    );
}