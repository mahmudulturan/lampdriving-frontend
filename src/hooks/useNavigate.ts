import { useRouter } from "next/navigation";

export const useNavigate = () => {
    const router = useRouter();
    const navigate = (path: string) => router.push(path);
    return navigate;
};