class ContactInfosController < ApplicationController
    def index
        @contacts = ContactInfo.all
    end

    def searchContacts
        @searchedContacts = ContactInfo.where([' name LIKE? ',"%#{params[:phrase]}%"])
                                        .select(:id, :name, :address, :mobile, :email)
        render :json => @searchedContacts.as_json(:only => [:id, :name, :address, :mobile, :email])
    end

    def new
        @contact = ContactInfo.new
    end

    def edit
        @contact = ContactInfo.find(params[:id])
    end

    def create
        @contact = ContactInfo.new(contact_params)
        if @contact.save
            redirect_to contact_infos_path, :notice => 'Your contact was created successfully'
        else
            render 'new'
        end
    end

    def update
        @contact = ContactInfo.find(params[:id])
        if @contact.update_attributes(contact_params)
            redirect_to contact_infos_path, :notice => 'Your contact was updated successfully'
        else
            render 'edit'
        end
    end

    def destroy
        @contact = ContactInfo.find(params[:id])
        @contact.destroy
    end

    def show
        @contact = ContactInfo.find(params[:id])
    end

    def contact_params
        params.require(:contact_info).permit(:name, :address, :phone, :mobile, :email)
    end
end
