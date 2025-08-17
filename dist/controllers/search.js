var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from '../clients/supabase.js.js';
export const getHomepage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, error } = yield supabase
            .from('listings')
            .select('*, media(*)')
            .limit(6);
        if (error) {
            throw error;
        }
        return void res.status(200).json({
            data: data
        });
    }
    catch (error) {
        console.error('Error!');
    }
});
export const getListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    try {
        const { data, error } = yield supabase
            .from('listings')
            .select('*, media(*), specs(*)')
            .eq('id', id)
            .single();
        if (error) {
            throw error;
        }
        return void res.status(200).json({
            data: data
        });
    }
    catch (error) {
        console.error('Error!');
    }
});
export const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    try {
        const { data, error } = yield supabase
            .from('listings')
            .select('*, media(*)')
            .eq('subcategory', category)
            .limit(6)
            .order('daily_price', { ascending: true });
        if (error) {
            throw error;
        }
        return void res.status(200).json({
            data: data
        });
    }
    catch (error) {
        console.error('Error!', error);
    }
});
