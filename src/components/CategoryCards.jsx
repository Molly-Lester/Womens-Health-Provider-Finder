import { Text, Paper, SimpleGrid } from '@mantine/core';
import classes from './CategoryCards.module.css';

export default function CategoryCards({ category, setCategory, error }) {
    const categories = [
        { id: 100, name: "General Women's Health", description: "GP services, routine check-ups, and general health concerns" },
        { id: 101, name: "Family Planning & Contraception", description: "Support with contraception, pregnancy planning, and reproductive choices" },
        { id: 102, name: "Sexual Health", description: "Testing, treatment, and advice for sexual health and wellbeing" },
        { id: 103, name: "Fertility Support", description: "Help with fertility concerns, testing, and treatment options" },
        { id: 104, name: "Pregnancy & Maternity Care", description: "Support during pregnancy, antenatal care, and postnatal services" },
        { id: 105, name: "Menopause Support", description: "Advice and treatment for menopause symptoms and hormonal changes" },
    ];

    return (
        <Paper
            withBorder
            radius="md"
            p="lg"
            className={`${classes.wrapper} ${error ? classes.wrapperError : ''}`}
        >
            <Text mb="sm" size="sm" ta="left">
                What brings you here today?
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {categories.map((cat) => (
                    <Paper
                        key={cat.id}
                        withBorder
                        p="md"
                        radius="md"
                        onClick={() => setCategory(cat.id)}
                        className={`${classes.card} ${category === cat.id ? classes.selected : ''
                            }`}
                    >
                        <Text fw={500} size="sm" ta="left">{cat.name}</Text>
                        <Text size="xs" c="dimmed" mt={5} ta="left">
                            {cat.description}
                        </Text>
                    </Paper>
                ))}
            </SimpleGrid>
            {error && (
                <Text className={classes.errorText} mt="xs">
                    {error}
                </Text>
            )}
        </Paper>
    );
}