CREATE TABLE site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    key VARCHAR(100) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    value TEXT,
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(section, key)
);

CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT NOT NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    images TEXT[] DEFAULT '{}',aError: Upload failed: "Unauthorized"Upload failed: Failed to fetch
    is_featured BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE page_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_slug VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    content TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(page_slug)
);

CREATE TABLE media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255),
    url TEXT NOT NULL,
    mime_type VARCHAR(100),
    size_bytes INTEGER,
    alt_text TEXT,
    caption TEXT,
    usage_type VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX idx_site_content_section ON site_content(section);
CREATE INDEX idx_site_content_active ON site_content(is_active);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_featured ON reviews(is_featured);
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_active ON reviews(is_active);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_order ON faqs(display_order);
CREATE INDEX idx_faqs_active ON faqs(is_active);
CREATE INDEX idx_page_content_slug ON page_content(page_slug);
CREATE INDEX idx_page_content_active ON page_content(is_active);
CREATE INDEX idx_media_usage ON media(usage_type);
CREATE INDEX idx_media_active ON media(is_active);

CREATE TRIGGER update_site_content_updated_at 
    BEFORE UPDATE ON site_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at 
    BEFORE UPDATE ON reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at 
    BEFORE UPDATE ON faqs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at 
    BEFORE UPDATE ON page_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_updated_at 
    BEFORE UPDATE ON media 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active site content" ON site_content FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT USING (is_approved = true AND is_active = true);
CREATE POLICY "Public can view active FAQs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active page content" ON page_content FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active media" ON media FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can manage site content" ON site_content FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin can manage reviews" ON reviews FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin can manage FAQs" ON faqs FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin can manage page content" ON page_content FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin can manage media" ON media FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

INSERT INTO site_content (section, key, content_type, value) VALUES
('hero', 'main_heading', 'text', 'Discover Rare & Beautiful Gemstones'),
('hero', 'subtitle', 'text', 'Handcrafted jewelry and precious stones from around the world'),
('hero', 'background_image', 'image', '/hero-bg.jpg'),
('hero', 'cta_text', 'text', 'Shop Collection'),
('hero', 'cta_link', 'text', '/shop'),
('featured', 'section_title', 'text', 'Featured Products'),
('featured', 'section_subtitle', 'text', 'Discover our most popular gemstones and jewelry'),
('about', 'section_title', 'text', 'About Gemsutopia'),
('about', 'section_content', 'html', 'We are passionate gemstone collectors and jewelry artisans dedicated to bringing you the finest specimens from around the world.'),
('contact', 'email', 'text', 'contact@gemsutopia.com'),
('contact', 'phone', 'text', '+1 (555) 123-4567'),
('contact', 'address', 'text', '123 Gem Street, Crystal City, CC 12345');

INSERT INTO page_content (page_slug, title, content, meta_description) VALUES
('about', 'About Gemsutopia', 'Welcome to Gemsutopia - your premier destination for rare and beautiful gemstones...', 'Learn about Gemsutopia mission to bring you the finest gemstones and jewelry from around the world.'),
('support', 'Customer Support', 'We are here to help with any questions about our products or services...', 'Get help with your Gemsutopia orders, returns, and product questions.'),
('privacy-policy', 'Privacy Policy', 'This Privacy Policy describes how we collect, use, and protect your information...', 'Gemsutopia privacy policy and data protection information.'),
('terms-of-service', 'Terms of Service', 'By using our website, you agree to these terms and conditions...', 'Terms and conditions for using Gemsutopia website and services.'),
('returns-exchange', 'Returns & Exchange', 'We want you to be completely satisfied with your purchase...', 'Return and exchange policy for Gemsutopia products.'),
('cookie-policy', 'Cookie Policy', 'This website uses cookies to enhance your browsing experience...', 'Information about how Gemsutopia uses cookies.'),
('cookie-settings', 'Cookie Settings', 'Manage your cookie preferences for this website...', 'Control your cookie settings and preferences.');

INSERT INTO faqs (question, answer, category, display_order) VALUES
('What types of gemstones do you offer?', 'We offer a wide variety of precious and semi-precious gemstones including diamonds, rubies, sapphires, emeralds, and many more rare specimens.', 'products', 1),
('Do you offer custom jewelry services?', 'Yes, we provide custom jewelry design services. Contact us to discuss your vision and we will create a unique piece just for you.', 'services', 2),
('What is your return policy?', 'We offer a 30-day return policy for unused items in original condition. Please see our Returns & Exchange page for full details.', 'returns', 3),
('How do you ensure gemstone authenticity?', 'All our gemstones come with certificates of authenticity from recognized gemological institutes.', 'quality', 4),
('Do you ship internationally?', 'Yes, we ship worldwide. Shipping costs and delivery times vary by location.', 'shipping', 5);