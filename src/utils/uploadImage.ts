import { supabase } from "../config/supabasClients";

export const uploadImage = async (file: File, folder = "books") => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`

    const { error } = await supabase.storage.from("book-barter").upload(filePath, file)

    if (error) throw error

    const { data: publicUrlData } = supabase.storage.from('book-barter').getPublicUrl(filePath);

    return publicUrlData.publicUrl
}