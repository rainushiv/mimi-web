import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

export default function RowCard({ name, place, image }) {
    return (
        <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
            <CardOverflow>
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src={`http://localhost:4000/${image}`}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography fontWeight="md" textColor="success.plainColor">
                    {name}

                </Typography>
                <Typography level="body-sm">{place}</Typography>
            </CardContent>

        </Card>
    );
}