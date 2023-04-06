import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox-next'
import {PaletteTree} from './palette'
import RoiCalculator from "/components/CALCS/RoiCalculator/RoiCalculator";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/RoiCalculator">
                <RoiCalculator/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews