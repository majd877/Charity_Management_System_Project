import PermissionModel from "../models/permissionModel.js";
import UserModel from "../models/UserModel.js";

/**
 * Seed all permissions and grant them to every admin user.
 */
const create = async (req, res, next) => {

  try {
    
    const data = [
      
      { name: "تصنيفات التبرعات", to: "category" },
      { name: "اضافة تصنيف تبرع", to: "category_create" },
      { name: "تعديل تصنيف تبرع", to: "category_update" },
      { name: "حذف تصنيف تبرع", to: "category_delete" },

      
      { name: "تصنيفات المتبرعين", to: "donors" },
      { name: "اضافة تصنيف المتبرعين", to: "donors_create" },
      { name: "تعديل تصنيف المتبرعين", to: "donors_update" },
      { name: "حذف تصنيف المتبرعين", to: "donors_delete" },

      
      { name: "الموظفين", to: "representative" },
      { name: "اضافة الموظفين", to: "representative_create" },
      { name: "تعديل الموظفين", to: "representative_update" },
      { name: "حذف الموظفين", to: "representative_delete" },
      { name: "اعطاء صلاحيات", to: "representative_permission" }, 
      { name: "متابعة اداء الموظفين", to: "representative_show" },

      
      { name: "المستفيدين", to: "beneficiary" },
      { name: "اضافة المستفيدين", to: "beneficiary_create" }, 
      { name: "تعديل المستفيدين", to: "beneficiary_update" },
      { name: "حذف المستفيدين", to: "beneficiary_delete" },

      
      { name: "المتبرعين", to: "donor" },
      { name: "اضافة المتبرعين", to: "donor_create" },
      { name: "تعديل المتبرعين", to: "donor_update" },
      { name: "حذف المتبرعين", to: "donor_delete" },

      
      { name: "الفعاليات", to: "event" },
      { name: "اضافة الفعاليات", to: "event_create" },
      { name: "تعديل الفعاليات", to: "event_update" },
      { name: "حذف الفعاليات", to: "event_delete" },

      
      { name: "قوائم التبرعات", to: "action" },
      { name: "اضافة قوائم التبرعات", to: "action_create" },
      { name: "تعديل قوائم التبرعات", to: "action_update" },
      { name: "حذف قوائم التبرعات", to: "action_delete" },

      
      { name: "رسائل للمستفيد", to: "sendMessageOne" },
      { name: "اضافة رسائل للمستفيد", to: "sendMessageOne_create" },
      { name: "تعديل رسائل للمستفيد", to: "sendMessageOne_update" },
      { name: "حذف رسائل للمستفيد", to: "sendMessageOne_delete" },
  

      
      { name: "رسائل شكر للمتبرع", to: "donor_thanks" },
      { name: "اضافة رسائل شكر للمتبرع", to: "donor_thanks_create" },
      { name: "تعديل رسائل شكر للمتبرع", to: "donor_thanks_update" },
      { name: "حذف رسائل شكر للمتبرع", to: "donor_thanks_delete" },

      
      { name: "الطلبات", to: "order" },
      { name: "اضافة الطلبات", to: "order_create" },
      { name: "تعديل الطلبات", to: "order_update" },
      { name: "حذف الطلبات", to: "order_delete" },

      
      { name: "كفالة يتيم", to: "orphan_sponsorship" },
      { name: "اضافة كفالة يتيم", to: "orphan_sponsorship_create" },
      { name: "تعديل كفالة يتيم", to: "orphan_sponsorship_update" },
      { name: "حذف كفالة يتيم", to: "orphan_sponsorship_delete" },

      
      { name: "حملات علاجية", to: "treatment_campaign" },
      { name: "اضافة حملات علاجية", to: "treatment_campaign_create" },
      { name: "تعديل حملات علاجية", to: "treatment_campaign_update" },
      { name: "حذف حملات علاجية", to: "treatment_campaign_delete" },

      { name: "استفسارات المستفيدين", to: "ComplaintsBeneficiary" },
      { name: "اضافة استفسارات المستفيدين", to: "ComplaintsBeneficiary_create" },
      { name: "تعديل استفسارات المستفيدين", to: "ComplaintsBeneficiary_update" },
      { name: "حذف استفسارات المستفيدين", to: "ComplaintsBeneficiary_delete" },
      
      { name: "استفسارات المتبرعين", to: "ComplaintsDonors" },
      { name: "اضافة استفسارات المتبرعين", to: "ComplaintsDonors_create" },
      { name: "تعديل استفسارات المتبرعين", to: "ComplaintsDonors_update" },
      { name: "حذف استفسارات المتبرعين", to: "ComplaintsDonors_delete" },
      
       { name: "كفالة يتيم", to: "OrphanSponsorship" },
      { name: "اضافة كفالة يتيم", to: "OrphanSponsorship_create" },
      { name: "تعديل كفالة يتيم", to: "OrphanSponsorship_update" },
      { name: "حذف كفالة يتيم", to: "OrphanSponsorship_delete" },

  { name: "حملات العلاجية", to: "TreatmentCampaign" },
      { name: "اضافة حملات العلاجية", to: "TreatmentCampaign_create" },
      { name: "تعديل حملات العلاجية", to: "TreatmentCampaign_update" },
      { name: "حذف حملات العلاجية", to: "TreatmentCampaign_delete" },
      
       { name: "شكاوي المتبرعين", to: "sendMessageDoubt" },
      { name: "اضافة شكاوي المتبرعين", to: "sendMessageDoubt_create" },
      { name: "تعديل شكاوي المتبرعين", to: "sendMessageDoubt_update" },
      { name: "حذف شكاوي المتبرعين", to: "sendMessageDoubt_delete" },
       
       { name: "شكاوي المستفيدين", to: "sendMessageBeneficiary" },
      { name: "اضافة شكاوي المستفيدين", to: "sendMessageBeneficiary_create" },
      { name: "تعديل شكاوي المستفيدين", to: "sendMessageBeneficiary_update" },
      { name: "حذف شكاوي المستفيدين", to: "sendMessageBeneficiary_delete" },
      
      
      { name: "صلاحيات الموظفين", to: "RepresentativePermission" }, 

    ];

    
    await PermissionModel.deleteMany({});
    const inserted = await PermissionModel.insertMany(data);

    
    const allPermKeys = data.map(p => p.to);
    const adminUpdate = await UserModel.updateMany(
      { user_type: "admin" },
      { $set: { permission: allPermKeys } },
    );


    return res.status(200).json({
      created: true,
      counts: {
        permissionsInserted: inserted.length,
        adminsUpdated: adminUpdate.modifiedCount ?? adminUpdate.nModified ?? 0,
      },
    });
  } catch (err) {
    
    return res.status(500).json({
      created: false,
      message: "Failed to seed permissions",
      error: err?.message,
    });
  }
};

const get = async (req, res, next) => {
  try {
    const data = await PermissionModel.find().lean();
    return res.status(200).json({
      success: true,
      data: {
        data,
        total: data.length,
        limit: data.length,
        page: 1,
        pages: 1,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch permissions",
      error: err?.message,
    });
  }
};

export default { get, create };
