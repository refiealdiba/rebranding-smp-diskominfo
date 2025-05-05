import { useState } from 'react'
import { supabase } from '../../config/db'

const FormAddArticle = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleUpload = async (e) => {
        e.preventDefault()

        try {
            setUploading(true)

            if (!image) {
                throw new Error('Pilih gambar terlebih dahulu!')
            }

            // Generate nama file unik
            const fileExt = image.name.split('.').pop()
            const fileName = `${ Math.random() }.${ fileExt }`
            const filePath = `${ fileName }`

            // Upload gambar ke Supabase storage
            let { error: uploadError } = await supabase.storage
                .from('thumbnail-article') // nama bucket Anda
                .upload(filePath, image)


            if (uploadError) {
                throw uploadError
            }

            // Dapatkan URL publik
            const { data: { publicUrl } } = supabase
                .storage
                .from('thumbnail-article')
                .getPublicUrl(filePath)

            setImageUrl(publicUrl)

            // Simpan data artikel ke database
            const { error } = await supabase
                .from('articles')
                .insert([
                    {
                        title: title,
                        content: content,
                        thumbnail: publicUrl,
                    },
                ])

            alert('Upload berhasil!')
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleUpload} className='flex flex-col items-center gap-4 p-4 shadow-lg rounded-lg mb-10'>
                <h2 className='text-2xl font-bold mb-4'>Tambah Artikel</h2>
                <input
                    type="text"
                    placeholder="Judul Artikel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border px-3 py-2 rounded w-full mb-4'
                />
                <textarea
                    placeholder="Konten Artikel"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='border px-3 py-2 rounded w-full mb-4'
                    rows="4"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    disabled={uploading}
                    className='border px-3 py-2 rounded w-full mb-4'
                />
                <button type="submit" disabled={uploading} className='bg-smporange hover:bg-orange-600 text-white px-4 py-2 rounded'>
                    {uploading ? 'Mengupload...' : 'Upload'}
                </button>
            </form>

            {imageUrl && (
                <div>
                    <h3>Gambar yang diupload:</h3>
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                    <p>URL Gambar: {imageUrl}</p>
                </div>
            )}
        </div>
    )
}

export default FormAddArticle