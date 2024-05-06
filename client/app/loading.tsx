import LoadingSpinner from '@/components/ui/loader';
const Loading = () => {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <LoadingSpinner />
        </div>
    );
}

export default Loading;