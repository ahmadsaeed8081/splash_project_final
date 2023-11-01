// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;


interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: contracts\open-zeppelin-contracts\math\SafeMath.sol

pragma solidity ^0.8.16;


library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }


    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }


    function mul(uint256 a, uint256 b) internal pure returns (uint256) {

        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {

        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }


    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Slash is ERC721, Ownable {
    using Strings for uint256;

    IERC20 public token;

    bool public paused = false;
    bool public revealed = true;
 
    string public notRevealedUri;
    // string public contractURI;  
    string public baseExtension = ".json";
    string private baseURI;
    // string public serverPath;

    uint96 royaltyFeesInBips;
    uint256 public MAX_SUPPLY = 999;
    uint256 public publicSaleCost = 80;
    uint256 public max_per_wallet = 999;
    uint256 public totalSupply;    
    uint256 public decimals = 6;
    uint256 public referralFeePercentage = 15;
// address public token_Contract = 0x1092fd852C82983F54Fb56aa71ADd5BCaAB6Ff4a; 
    address public token_Contract = 0xc16b32F200eA3c91E06c016e3F19738459F74146; 
    address royaltyAddress;    


    mapping(address => uint256) public publicMinted;
    uint[] public mintedList;
    // mapping(address => string) public profileName;
    mapping(address => address) public myreferee;
    mapping(address => ReferralData[]) public referrelList;
    mapping(address => uint256) public myReferrelCount;
    mapping(address => bool) public isReferred;
    // mapping(address => string)public myImgPath;
    // mapping(address => bool)public isImgSaved;

   struct ReferralData {
        uint256 time;
        address referralAddress;
        uint256 refAmount;
    }
    struct data{
        uint[] myNfts;
    }
    mapping(address => data)  myWallet;

    // ReferralData[] public referralData;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri
        // string memory _contractURI
        // string memory _serverPath
      //  uint96 _royaltyFeesInBips
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
        // contractURI = _contractURI;
        royaltyAddress = owner();
        token = IERC20(token_Contract);
        // setRoyaltyInfo(owner(),500);
        // setServerPath(_serverPath);
    }

     function mint(uint256 tokenId, address new_ref) public payable  {

        require(tokenId > 0, "0 cannot be minted");
        require(totalSupply + 1 <= MAX_SUPPLY,"No More NFTs to Mint");
        require(!_exists(tokenId),"Token already minted");

        if (msg.sender != owner()) {

            require(!paused, "The contract is paused");     
            require(publicMinted[msg.sender] + 1 <= max_per_wallet, "Per Wallet Limit Reached");

            if(isReferred[msg.sender]){

            uint256 referralFee = (publicSaleCost * referralFeePercentage * 10 ** decimals) / 100;
            uint256 companyFee = (publicSaleCost * (100 - referralFeePercentage) * 10 ** decimals) / 100;
            require(token.balanceOf(msg.sender) >= (companyFee + referralFee ), "You do not have enough tokens to perform the transaction");

                token.transferFrom(msg.sender, owner(), (companyFee));   
                token.transferFrom(msg.sender, myreferee[msg.sender], (referralFee)); 

                // uint256 refFee = referralFee * 10 ** decimals;
            ReferralData memory referral_data = ReferralData(block.timestamp, msg.sender, referralFee);
            
            referrelList[myreferee[msg.sender]].push(referral_data);
            myReferrelCount[myreferee[msg.sender]]++;

            } else if(new_ref!=address(0)){
                
            uint256 referralFee = (publicSaleCost * referralFeePercentage * 10 ** decimals) / 100;
            uint256 companyFee = (publicSaleCost * (100 - referralFeePercentage) * 10 ** decimals) / 100;
            require(token.balanceOf(msg.sender) >= (companyFee + referralFee ), "You do not have enough tokens to perform the transaction");

                token.transferFrom(msg.sender, owner(), (companyFee));   
                token.transferFrom(msg.sender, new_ref, (referralFee));



                // uint256 refFee = referralFee * 10 ** decimals;
            ReferralData memory referral_data = ReferralData(block.timestamp, msg.sender, referralFee);
            
            referrelList[new_ref].push(referral_data);
            myReferrelCount[new_ref]++;
            
                isReferred[msg.sender]=true;
                myreferee[msg.sender] = new_ref;

            }else{
                
                uint256 companyFee = publicSaleCost * 10 ** decimals;
                require(token.balanceOf(msg.sender) >= companyFee, "You do not have enough tokens to perform the transaction");

                token.transferFrom(msg.sender, owner(), (companyFee));   

            }
                                                     
                                        
        }

        totalSupply++;
        _safeMint(msg.sender, tokenId);
        mintedList.push(tokenId);
        myWallet[msg.sender].myNfts.push(tokenId);
        
    }

    function referreeRegister(address referee) external{

        require(!isReferred[msg.sender],"Referee Exist");

        myreferee[msg.sender] = referee;
        isReferred[msg.sender] = true;            
    }

    // function saveImg(string memory accountID) external{

    //     myImgPath[msg.sender] = accountID;
    //     isImgSaved[msg.sender] = true;            
    // }

    // function getProfileURL(address accountID) external view returns(string memory) {
    //     return string(abi.encodePacked(serverPath, myImgPath[accountID], ".png"));
    // }

    function getTokenStatus(uint256 tokenID) external view returns(bool) {
        return _exists(tokenID);
    }

    function withdraw() public payable onlyOwner 
    {
        (bool main, ) = payable(owner()).call{value: address(this).balance}("");
        require(main);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        _requireMinted(tokenId);

        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(baseURI, tokenId.toString(), baseExtension)
                )
                : "";
    }

    // function setApprovalForAll(address operator, bool approved)
    //     public
    //     override
    //     onlyAllowedOperatorApproval(operator)
    // {
    //     super.setApprovalForAll(operator, approved);
    // }

    // function approve(address operator, uint256 tokenId)
    //     public
    //     override
    //     onlyAllowedOperatorApproval(operator)
    // {
    //     super.approve(operator, tokenId);
    // }

    // function transferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) public override onlyAllowedOperator(from) {
    //     super.transferFrom(from, to, tokenId);
    // }

    // function safeTransferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) public override onlyAllowedOperator(from) {
    //     super.safeTransferFrom(from, to, tokenId);
    // }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips)
        public
        onlyOwner
    {
        royaltyAddress = _receiver;
        royaltyFeesInBips = _royaltyFeesInBips;
    }

    // function safeTransferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId,
    //     bytes memory data
    // ) public override onlyAllowedOperator(from) {
    //     super.safeTransferFrom(from, to, tokenId, data);
    // }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function getBaseURI() external view onlyOwner returns (string memory) {
        return baseURI;
    }

    // function royaltyInfo(uint256 _tokenId, uint256 _salePrice)
    //     public
    //     view
    //     virtual
    //     override
    //     returns (address, uint256)
    // {
    //     return (royaltyAddress, calculateRoyalty(_salePrice));
    // }


    function calculateRoyalty(uint256 _salePrice)
        public
        view
        returns (uint256)
    {
        return (_salePrice / 10000) * royaltyFeesInBips;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     virtual
    //     override(ERC721, ERC2981)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setPause(bool _state) external onlyOwner {
        paused = _state;
    }

    function setBaseExtension(string memory _newBaseExtension)
        external
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function toggleReveal() external onlyOwner {
        if (revealed == false) {
            revealed = true;
        } else {
            revealed = false;
        }
    }

    function setMAX_SUPPLY(uint256 _MAX_SUPPLY) external onlyOwner {
        MAX_SUPPLY = _MAX_SUPPLY;
    }

    function setMax_per_wallet(uint256 _max_per_wallet) external onlyOwner {
        max_per_wallet = _max_per_wallet;
    }

    // function setServerPath(string memory _serverPath) public onlyOwner {
    //     serverPath = _serverPath;
    // }

    // function changeName(string memory _name) external {
    //     profileName[msg.sender] = _name;
    // }

    function setRoyaltyAddress(address _royaltyAddress) external onlyOwner {
        royaltyAddress = _royaltyAddress;
    }
    
    // function setContractURI(string calldata _contractURI) external onlyOwner {
    //     contractURI = _contractURI;
    // }

    function setTokenContract(address _tokenContract) public onlyOwner{
        token = IERC20(_tokenContract);
        token_Contract = _tokenContract;
    }
    
    function setDecimals(uint256 _decimals) public onlyOwner {
       decimals = _decimals;
    }

    function setPublicSaleCost(uint256 _publicSaleCost) public onlyOwner {
       publicSaleCost = _publicSaleCost;
    }

    function setReferralFeePercentage(uint256 _referralFeePercentage) public onlyOwner {
       referralFeePercentage = _referralFeePercentage;
    }

    function get_myAllNFTs() public view returns( uint[] memory arr) {

        return myWallet[msg.sender].myNfts;

    }
    function get_myAllComissions() public view returns( ReferralData[] memory ){

     return referrelList[msg.sender];

    }
    function get_MintedNFTs() public view returns( uint[] memory arr) {

        return mintedList;


    }
}
