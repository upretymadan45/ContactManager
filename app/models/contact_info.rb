class ContactInfo < ApplicationRecord
    validates_presence_of :name, :address

    def as_json(options={})
        super(:only => [:id, :name, :address])
    end
end
