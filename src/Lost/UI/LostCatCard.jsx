import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { API_URL } from '../../Shared/hooks/config'

export default function OverflowCard({ name, id, image, place }) {
    return (
        <Card variant="outlined" sx={{ width: 220 }}>
            <CardOverflow>
                <AspectRatio ratio="1.75">
                    <img
                        src={`${API_URL}/${image}`}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography level="title-md">{name}</Typography>
                <Typography level="body-sm">{place}</Typography>
            </CardContent>

        </Card>
    );
}