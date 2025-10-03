import cloudinary, {CloudinaryUploadOptions, CloudinaryUploadResult} from '@/lib/cloudinary';

class CloudinaryService {
    // Upload file from buffer/base64
    async uploadFile(
        file,
        options = {}
    ) {
        try {
            const defaultOptions = {
                resource_type: 'auto',
                folder: 'uploads',
                unique_filename: true,
                overwrite: false,
                ...options
            };

            let fileData = '';
            switch (defaultOptions.resource_type) {
                case 'auto':
                    fileData = `data:image/png;base64,${file.toString("base64")}`;
                    break;
                case 'raw':
                    fileData = `data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,${file.toString("base64")}`;
            }

            const result = await cloudinary.uploader.upload(
                Buffer.isBuffer(file) ? fileData : file,
                defaultOptions
            );
            return result
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }
    }

    // upload chunked video
    async uploadVideoChunked(
        file,
        options = {}
    ) {
        try {
            const defaultOptions = {
                resource_type: 'video',
                folder: 'videos',
                unique_filename: true,
                overwrite: false,
                chunk_size: 6_000_000,
                ...options
            };

            return (await cloudinary.uploader.upload_large(
                `data:video/mp4;base64,${file.toString("base64")}`,
                defaultOptions
            )) 
        } catch (error) {
            console.error('Cloudinary chunked upload error:', error);
            throw new Error(`Chunked upload failed: ${error.message}`);
        }
    }

    // Upload multiple files
    async uploadMultipleFiles(
        files
    ){
        try {
            const uploadPromises = files.map(({file, options}) =>
                this.uploadFile(file, options)
            );

            const results = await Promise.allSettled(uploadPromises);

            const successful = results
                .filter(result => result.status === 'fulfilled')
                .map(result => (result).value);

            const failed = results
                .filter(result => result.status === 'rejected')
                .map(result => (result).reason);

            if (failed.length > 0) {
                console.warn('Some uploads failed:', failed);
            }

            return successful;
        } catch (error) {
            console.error('Multiple upload error:', error);
            throw error;
        }
    }

    // Delete file
    async deleteFile(publicId, resourceType) {
        try {
            return await cloudinary.uploader.destroy(publicId, {
                resource_type: resourceType
            });
        } catch (error) {
            console.error('Cloudinary delete error:', error);
            throw new Error(`Delete failed: ${error.message}`);
        }
    }

    // Delete multiple files
    async deleteMultipleFiles(publicIds, resourceType){
        try {
            return await cloudinary.api.delete_resources(publicIds, {
                resource_type: resourceType
            });
        } catch (error) {
            console.error('Multiple delete error:', error);
            throw error;
        }
    }

    // Get file info
    async getFileInfo(publicId, resourceType) {
        try {
            return await cloudinary.api.resource(publicId, {
                resource_type: resourceType
            });
        } catch (error) {
            console.error('Get file info error:', error);
            throw error;
        }
    }

    // List files in folder
    async listFiles(folder = '', maxResults = 30) {
        try {
            return await cloudinary.api.resources({
                type: 'upload',
                prefix: folder,
                max_results: maxResults
            });
        } catch (error) {
            console.error('List files error:', error);
            throw error;
        }
    }

    async listImages(folder= '', maxResults = 30) {
        try {
            const result = await cloudinary.api.resources({
                type: 'upload',
                resource_type: "image",
                prefix: folder,
                max_results: maxResults
            });
            return {
                ...result,
                resources: result.resources.filter((r) =>
                    ["jpg", "jpeg", "png", "webp", "gif"].includes(r.format)
                )
            };
        } catch (error) {
            console.error('List files error:', error);
            throw error;
        }
    }

    // Generate optimized URL
    generateOptimizedUrl(
        publicId,
        options= {}
    ) {
        return cloudinary.url(publicId, {
            secure: true,
            ...options
        });
    }

    // Generate responsive image URLs
    generateResponsiveUrls(publicId, sizes = [480, 768, 1024, 1440]) {
        const urls = {};

        sizes.forEach(size => {
            urls[`w_${size}`] = this.generateOptimizedUrl(publicId, {
                width: size,
                crop: 'scale',
                quality: 'auto',
                format: 'auto'
            });
        });

        return urls;
    }

    // Search files
    async searchFiles(expression, maxResults= 30) {
        try {
            return await cloudinary.search
                .expression(expression)
                .max_results(maxResults)
                .execute();
        } catch (error) {
            console.error('Search files error:', error);
            throw error;
        }
    }

    async convertPptxToImages(publicId) {
        const result = await cloudinary.api.resource(publicId, {
            resource_type: "image",
            pages: true,
        });
        return result.pages;
    };
}

export const cloudinaryService = new CloudinaryService();

