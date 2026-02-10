import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import { memo } from 'react'

interface Props {
    showConfetti: boolean
}

const LoveConfetti = ({ showConfetti = false }: Props) => {
    const { width, height } = useWindowSize()

    if (!showConfetti) return null

    return (
        <Confetti
            width={width}
            height={height}
            run={showConfetti}
            initialVelocityY={15}
        />
    )
}

export default memo(LoveConfetti)
