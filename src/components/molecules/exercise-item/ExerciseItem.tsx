import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { ExerciseWorkoutSettings } from '../../../model/Exercise.model';
import ExercisesTimeRepsIcons from '../../organisms/exercises-time-reps-icons/ExercisesTimeRepsIcons';
import { v4 as uuidv4 } from 'uuid';
import { ResponsiveStyleValue, SxProps, Theme } from '@mui/system';

export type ExerciseItemProps = {
    exercise: ExerciseWorkoutSettings;
    parentIdPrefix: string;
    index?: number;
    typographySx?: SxProps<Theme> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typographyMarginLeft?: ResponsiveStyleValue<any> | undefined;
};

const ExerciseItem: FC<ExerciseItemProps> = ({
    exercise,
    parentIdPrefix,
    index = 0,
    typographySx,
    typographyMarginLeft
}: ExerciseItemProps) => {
    let length = 0;
    if (typeof exercise.amountValue === 'number') {
        length = exercise.amountValue;
    } else if (typeof exercise.amountValue === 'string') {
        length = parseInt(exercise.amountValue);
    }

    return (
        <Grid container direction="row" justifyContent={{ xs: 'space-between', sm: 'flex-start' }} alignItems="center">
            <Typography
                key={exercise.id}
                id={`${parentIdPrefix}name__${index}`}
                align="left"
                variant="body2"
                sx={typographySx}
                marginLeft={typographyMarginLeft}
                minWidth={{ xs: 0, sm: '20rem' }}
            >
                {exercise.name}
            </Typography>
            <ExercisesTimeRepsIcons
                entities={[exercise]}
                id={exercise.id ? exercise.id : uuidv4()}
                length={length}
                parentIdPrefix={parentIdPrefix}
                index={index}
                type={exercise.amountType}
            ></ExercisesTimeRepsIcons>
        </Grid>
    );
};

export default ExerciseItem;
