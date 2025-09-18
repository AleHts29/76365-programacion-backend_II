import mongose from 'mongoose';

const businessSchema = new mongose.Schema(
    {
        name: { type: String, required: true },
        category: String,
        products: []
    }
)

const businessModel = mongose.model('businesses', businessSchema);
export default businessModel;