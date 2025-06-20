interface BadgeProps {
    type: "lend" | "barter" | "buy" | "pending" | "accepted" | "rejected"
}
const style = {
    lend: "text-blue-500 px-3 py-1 font-medium text-xs rounded-full bg-blue-100 w-fit",
    barter: "text-violet-500 px-3 py-1 font-medium text-xs rounded-full bg-violet-100 w-fit",
    buy: "text-green-500 px-3 py-1 font-medium text-xs rounded-full bg-green-100 w-fit",
    pending: "text-yellow-500 px-3 py-1 font-medium text-xs rounded-full bg-yellow-100 w-fit ",
    rejected: "text-yellow-500 px-3 py-1 font-medium text-xs rounded-full bg-yellow-100 w-fit ",
    accepted: "text-yellow-500 px-3 py-1 font-medium text-xs rounded-full bg-yellow-100 w-fit ",

}
const Badge = ({ type }: BadgeProps) => {
    return (
        <p className={`${style[type]}`}>{type}</p>
    )
}

export default Badge 